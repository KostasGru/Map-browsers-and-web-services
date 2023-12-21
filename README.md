# Žemėlapių naršyklės ir elektroninės paslaugos
Pateikiami Žemėlapių naršyklių ir elektroninių paslaugų kurso praktinių darbų rezultatai. 

## Pirmoji užduotis - Foninio žemėlapio vizualizacijų sukūrimas naudojant Vector tiles technologiją

Užduoties metu sukurti 3 foniniai (baziniai) žemėlapių stiliai kuriamai žemėlapių naršyklei. Visi rezultatai pateikiami aplanke [work-1](https://github.com/KostasGru/Map-browsers-and-web-services/tree/main/Work-1).

- Topografinis žemėlapio stilius - darbui su detalia informacija - [topo.json](https://github.com/KostasGru/Map-browsers-and-web-services/blob/main/Work-1/topo.json).
- Gamtinis (angl. outdoor) - darbui lauko sąlygomis - [outdoor.json](https://github.com/KostasGru/Map-browsers-and-web-services/blob/main/Work-1/outdoor.json).
- Apžvalginis - darbui su temine, statistine informacija, kaip fonas teminei informacijai papildyti, jos neužgožiant (pilkas, pastelinių spalvų) - [pastel.json](https://github.com/KostasGru/Map-browsers-and-web-services/blob/main/Work-1/pastel.json).

## Antroji užduotis - Paruošti GIS infrastruktūrą ir publikuoti WMS el. paslaugas

Užduoties metu kompiuteryje sukonfigūruotas QGIS serveris, veikiantis Docker pagrindu. QGIS serveryje publikuotos trys el. paslaugos iš PostgreSQL duomenų bazės. Šios paslaugos 3 užduotyje bus panaudos integravimui į žemėlapių naršyklę. Repozitorijoje pateikti trys žemėlapio projektai:

- Bendrojo pagalbos centro skambučių žemėlapis - [bpc.qgs](https://github.com/KostasGru/Map-browsers-and-web-services/blob/main/Work-2/bpc.qgs).
- Būstų žemėlapis - [bustai.qgs](https://github.com/KostasGru/Map-browsers-and-web-services/blob/main/Work-2/bustai.qgs).
- 10 ilgiausių Lietuvos upių žemėlapis - [upes.qgs](https://github.com/KostasGru/Map-browsers-and-web-services/blob/main/Work-2/upes.qgs).

## Trečioji užduotis - Sukurti žemėlapių naršylę naudojant JS, HTML ir CSS

Suprogramuota bazinio funkcionalumo žemėlapių naršyklė, kurioje integruota: 2 darbe sukurtos teminės WMS el. paslaugas, 1 praktiniame darbe sukurti foniniai žemėlapiai. Žemėlapių naršyklė programuota naudojant HTML, CSS ir JS technologijas bei MapLibre žemėlapių naršyklių kūrimo biblioteką.

Sukurtoje žemėlapių naršyklėje yra:

- Bazinis žemėlapių sluoksnių valdymo (foninių ir teminių žemėlapių įjungimas/išjungimas) funkcionalumas;
- žemėlapio valdymo funkcionalumas (standartiniai MapLibre bibliotekos įrankiai, tokie kaip zoom in/zoom out, paieška);
- Pateikta žemėlapio aplikacijos aprašomoji informacija, tokia kaip: trumpi aprašymai, informacija apie autorių, metus ir kt.;
- Integruoti 1 praktikos darbe sukurti foniniai žemėlapiai (3 foniniai žemėlapiai);
- Integruotos 2 praktiniame darbe sukurtos teminės el. paslaugos (3 WMS el. paslaugos);
- Integruoti įskiepiai, papildantys bazinį žemėlapio funkcionalumą, pvz. matavimus, vietovardžių paiešką ir pan.
