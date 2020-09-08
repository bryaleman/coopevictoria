//Sistema de monitoreo de cultivo en CoopeVictoria R.L.

function updateOpacity() {
	document.getElementById("span-opacity").innerHTML = document.getElementById("sld-opacity").value;
	ndvi.setOpacity(document.getElementById("sld-opacity").value);
}

//-------------------------------------------------------------------------------------------------------
// Mapa base
var map = L.map("mapid");


// Centro del mapa y nivel de acercamiento
var mapacoopevi = L.latLng([10.4, -84.2]);
var zoomLevel = 8;

// Definición de la vista del mapa
map.setView(mapacoopevi, zoomLevel);


// Control de zoom					
//L.control.zoom({position:'topright'}).addTo(map);
//Control de escala 
L.control.scale({position:'topright',imperial:false}).addTo(map);


// Adición de las capas base
esri = L.tileLayer.provider("Esri.WorldImagery").addTo(map);
osm = L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(map);

// Indice de Vegetacion diciembre 2019
///var ndvi = L.imageOverlay("ndvi.png", 
///	[[10.1387257937176312, -84.3679128707571806], 
///	[9.9967152737829750, -84.2313861376834154]], 
///	{opacity:0.8}
///).addTo(map);


// Conjunto de control de Capas Base
var baseMaps = {
	"ESRI World Imagery": esri,
	"OpenStreetMap": osm   
};

//Conjunto de capas overlay
///var overlayMaps = {
///	"NDVI Diciembre 2018": ndvi
///};

// Fincas de CoopeVictoria
///$.getJSON("lotes_coopevictoriarl.geojson", function(geodata) {
///	var layer_geojson_lotes_coopevictoriarl = L.geoJson(geodata, {
///		style: function(feature) {
///			return {'color': "#c71d1a", 'weight': 1, 'fillOpacity': 0.0}
///		},
///		onEachFeature: function(feature, layer) {
///			var popupText = "Finca: " + feature.properties.FINCA + "<br>" + "Lote: " + feature.properties.LOTE +
///			"<br>" + "Variedad: " + feature.properties.VARIEDAD + "<br>" + "Área: " + feature.properties.AREA;
///			layer.bindPopup(popupText);
///		}			
///	}).addTo(map);
///	control_layers.addOverlay(layer_geojson_lotes_coopevictoriarl, 'Plantaciones de Caña CoopeVictoria R.L.');
///});


// Distritos de Influencia
$.getJSON("2010_regiones_crtm05_reh_wgs84.geojson", function(geodata) {
	var layer_geojson_2010_regiones_crtm05_reh_wgs84 = L.geoJson(geodata, {
		style: function(feature) {
			return {'color': "#000000", 'weight': 1, 'fillOpacity': 0.0}
		},
		onEachFeature: function(feature, layer) {
			var popupText = "Cantón: " + feature.properties.NCANTON + "<br>"
			+" pH Alto: " + feature.properties.PH_ALTO + " pH Medio: " + feature.properties.PH_MEDIO + " pH Bajo: " + feature.properties.PH_BAJO + "<br>"
			+ "Ac Alto: " + feature.properties.AC_ALTO + " Ac Medio: " + feature.properties.AC_MEDIO + " Ac Bajo: " + feature.properties.AC_BAJO +"<br>"
			+ "Ca Alto: " + feature.properties.CA_ALTO + " Ca Medio: " + feature.properties.CA_MEDIO + " Ca Bajo: " + feature.properties.CA_BAJO +"<br>" 
			+ "SA Alto: " + feature.properties.S_A_ALTO + " SA Medio: " + feature.properties.S_A_MEDIO + " SA Bajo: " + feature.properties.S_A_BAJO +"<br>"
			+ "K Alto: " + feature.properties.K_ALTO + " K Medio: " + feature.properties.K_MEDIO + " K Bajo: " + feature.properties.K_BAJO +"<br>"
			+ "P Alto: " + feature.properties.P_ALTO + " P Medio: " + feature.properties.P_MEDIO + " P Bajo: " + feature.properties.P_BAJO +"<br>"
			+ "Número de Muestras: " + feature.properties.N_DE_MUEST +"<br>"
			+ "Área: " + feature.properties.Area;
			layer.bindPopup(popupText);
		}			
	}).addTo(map);
	control_layers.addOverlay(layer_geojson_2010_regiones_crtm05_reh_wgs84, 'Distritos');
});

//


// Ubicacion del control de capas
control_layers = L.control.layers(baseMaps, overlayMaps, {position:'topright', collapsed:true}).addTo(map);	























