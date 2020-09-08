//Sistema de monitoreo de cultivo en CoopeVictoria R.L.

function updateOpacity() {
	document.getElementById("span-opacity").innerHTML = document.getElementById("sld-opacity").value;
	ndvi.setOpacity(document.getElementById("sld-opacity").value);
}

//-------------------------------------------------------------------------------------------------------
// Mapa base
var map = L.map("mapid");


// Centro del mapa y nivel de acercamiento
var mapacoopevi = L.latLng([10.06773512, -84.2996532494]);
var zoomLevel = 12;

// Definición de la vista del mapa
map.setView(mapacoopevi, zoomLevel);


// Control de zoom					
L.control.zoom({position:'topright'}).addTo(map);
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
	var layer_geojson_distritos_influencia = L.geoJson(geodata, {
		style: function(feature) {
			return {'color': "#000000", 'weight': 1, 'fillOpacity': 0.0}
		},
		onEachFeature: function(feature, layer) {
			var popupText = "Cantón: " + feature.properties.ncanton + "pH Alto: " + feature.properties.ph_alto + "pH Medio: " + feature.properties.ph_medio +
			    "pH Bajo: " + feature.properties.ph_bajo + "<br>"
			 + "Ca Alto: " + feature.properties.ca_alto + "Ca Medio: " + feature.properties.ca_medio + "Ca Bajo: " + feature.properties.ca_bajo +"<br>" 
			+ "Área: " + feature.properties.area;
			layer.bindPopup(popupText);
		}			
	}).addTo(map);
	control_layers.addOverlay(layer_geojson_distritos_influencia, 'Distritos');
});




// Ubicacion del control de capas
control_layers = L.control.layers(baseMaps, overlayMaps, {position:'topright', collapsed:true}).addTo(map);	























