var map = new maplibregl.Map({
  container: "map",
  style: "map_styles/topo.json",
  center: [23.076, 55.238],
  zoom: 7,
  minZoom:7,
  hash: true,
});


const geocoderApi = {
  forwardGeocode: async (config) => {
      const features = [];
      try {
          const request =
      `https://nominatim.openstreetmap.org/search?q=${
          config.query
      }&format=geojson&polygon_geojson=1&addressdetails=1`;
          const response = await fetch(request);
          const geojson = await response.json();
          for (const feature of geojson.features) {
              const center = [
                  feature.bbox[0] +
              (feature.bbox[2] - feature.bbox[0]) / 2,
                  feature.bbox[1] +
              (feature.bbox[3] - feature.bbox[1]) / 2
              ];
              const point = {
                  type: 'Feature',
                  geometry: {
                      type: 'Point',
                      coordinates: center
                  },
                  place_name: feature.properties.display_name,
                  properties: feature.properties,
                  text: feature.properties.display_name,
                  place_type: ['place'],
                  center
              };
              features.push(point);
          }
      } catch (e) {
          console.error(`Failed to forwardGeocode with error: ${e}`);
      }

      return {
          features
      };
  }
};
map.addControl(
  new MaplibreGeocoder(geocoderApi, {
      maplibregl,
      placeholder: 'Paieška'
  })
);


// Add zoom and rotation controls to the map.
map.addControl(new maplibregl.NavigationControl());

map.addControl(new maplibregl.FullscreenControl());

map.addControl(new maplibregl.GeolocateControl({
  positionOptions: {
      enableHighAccuracy: true
  },
  trackUserLocation: true
}));

let scale = new maplibregl.ScaleControl({
  maxWidth: 80,
  unit: 'imperial'
});
map.addControl(scale, 'bottom-right');
scale.setUnit('metric');


map.addControl(new MaplibreExportControl.MaplibreExportControl({
  PageSize: MaplibreExportControl.Size.A4,
  PageOrientation: MaplibreExportControl.PageOrientation.Landscape,
  Format: MaplibreExportControl.Format.PNG,
  DPI: MaplibreExportControl.DPI[300],
  Crosshair: true,
  PrintableArea: true,
  Local: 'en'
}), 'top-right');





/* function changeMapStyle(styleType) {
  removeLayer();
  map.setStyle("map_styles/" + styleType + ".json");

  setTimeout(() => {
    loadLayers();
  }, "1000");
}

*/

let selectedButtonId = 'layer-btn-topo';
document.getElementById(selectedButtonId).style.filter = "none";

// Array to store toggled layers
let toggledLayers = [];

function changeMapStyle(styleType) {
  // Remove 'selected' class from the previously selected button
  document.getElementById(selectedButtonId).style.filter = "grayscale()";

  // Set the new style
  map.setStyle("map_styles/" + styleType + ".json");

  // Add 'selected' class to the clicked button
  selectedButtonId = "layer-btn-" + styleType;
  document.getElementById(selectedButtonId).style.filter = "none";

  // Load layers after a delay (adjust the delay as needed)
  setTimeout(() => {
    loadLayers();
    // Apply visibility to toggled layers
    applyToggledLayersVisibility();
  }, 1000);
}

map.on("load", () => {
  loadLayers();
});

function toggleLayer(layerName) {
  const layerNameHtml = "layer-btn-" + layerName;

  if (map.getLayoutProperty(layerName, "visibility") == "none") {
    map.setLayoutProperty(layerName, "visibility", "visible");
    document.getElementById(layerNameHtml).style.filter = "none";
    // Add the toggled layer to the array if not already present
    if (!toggledLayers.includes(layerName)) {
      toggledLayers.push(layerName);
    }
  } else {
    map.setLayoutProperty(layerName, "visibility", "none");
    document.getElementById(layerNameHtml).style.filter = "grayscale()";
    // Remove the toggled layer from the array
    toggledLayers = toggledLayers.filter((layer) => layer !== layerName);
  }
}

function applyToggledLayersVisibility() {
  // Loop through the toggled layers array and set visibility
  toggledLayers.forEach((layerName) => {
    const layerNameHtml = "layer-btn-" + layerName;
    map.setLayoutProperty(layerName, "visibility", "visible");
    document.getElementById(layerNameHtml).style.filter = "none";
  });
}



let sidebarStatus = "visible";
function toggleSidebar() {

  const sidebarText = document.getElementById("sidebar-text");
  if (sidebarStatus == "none") {
    document.getElementById("mapapp-sidebar").style.display = "block";
    sidebarStatus = "visible";
    sidebarText.textContent = "Suskleiskite šoninį meniu";
  } else {
    document.getElementById("mapapp-sidebar").style.display = "none";
    sidebarStatus = "none";
    sidebarText.textContent = "Išskleiskite šoninį meniu";
  }
}


function loadLayers() {
  console.log("Loading layers");
  map.addSource("upes-source", {
    type: "raster",
    tiles: [
      "http://127.0.0.1:8010/ogc/upes?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=IlgiausiosUpes",
    ],
    tileSize: 256,
  });
  map.addLayer({
    id: "upes-layer",
    type: "raster",
    source: "upes-source",
    layout: {
      visibility: "none",
    },
    paint: {},
  });

  map.addSource("bpc-source", {
    type: "raster",
    tiles: [
      "http://127.0.0.1:8010/ogc/bpc?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=bpc_vda",
    ],
    tileSize: 256,
  });
  map.addLayer({
    id: "bpc-layer",
    type: "raster",
    source: "bpc-source",
    layout: {
      visibility: "none",
    },
    paint: {},
  });

  map.addSource("bustai-source", {
    type: "raster",
    tiles: [
      "http://127.0.0.1:8010/ogc/bustai?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=bustai_2021",
    ],
    tileSize: 256,
  });
  map.addLayer({
    id: "bustai-layer",
    type: "raster",
    source: "bustai-source",
    layout: {
      visibility: "none",
    },
  });
};


MapboxDraw.constants.classes.CONTROL_BASE  = 'maplibregl-ctrl';
MapboxDraw.constants.classes.CONTROL_PREFIX = 'maplibregl-ctrl-';
MapboxDraw.constants.classes.CONTROL_GROUP = 'maplibregl-ctrl-group';


const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
      polygon: true,
      trash: true
  }
});
map.addControl(draw);

map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);

function updateArea(e) {
  const data = draw.getAll();
  const answer = document.getElementById('calculated-area');
  const calculationBox = document.getElementById('calculation-box');

  // Clear existing text elements
  const existingTextElements = document.querySelectorAll('.drawn-text');
  existingTextElements.forEach((element) => element.remove());

  if (data.features.length > 0) {
    data.features.forEach((feature) => {
      const area = turf.area(feature);
      // restrict area to 2 decimal points
      const roundedArea = Math.round(area * 100) / 100;

      // Create a text element to display the rounded area within each drawn polygon
      const textElement = document.createElement('div');
      textElement.className = 'drawn-text';
      textElement.innerHTML = `<p style="font-weight: bold; color: red";>${roundedArea} m2</p>`;

      // Calculate the centroid of each drawn polygon
      const centroid = turf.centroid(feature);
      const coordinates = centroid.geometry.coordinates;

      // Update the position of the text element based on the centroid
      const point = map.project(coordinates);
      textElement.style.position = 'absolute';
      textElement.style.left = `${point.x}px`;
      textElement.style.top = `${point.y}px`;
      textElement.style.transform = 'translate(-50%, -50%)'; // Center the text

      textElement.style.zIndex = '1000';

      // Append the text element to the map container
      document.getElementById('map').appendChild(textElement);

      // Listen for map move events and update the text position accordingly
      map.on('move', () => {
        const updatedPoint = map.project(coordinates);
        textElement.style.left = `${updatedPoint.x}px`;
        textElement.style.top = `${updatedPoint.y}px`;
      });
    });

    answer.innerHTML = ''; // Clear the area result in the calculation box
    calculationBox.style.display = 'none'; // Hide the calculation box
  } else {
    answer.innerHTML = '';
    calculationBox.style.display = 'none';
  }
}