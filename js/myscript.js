var mapDataUrl = 'json/data.json';
var mapData = [];

$(document).ready(function(){
    init();
});

function
init()
{
	loadMapData();
}

function
loadMapData()
{
	$.getJSON(mapDataUrl, onMapDataLoaded);
}

function
onMapDataLoaded(data)
{
	mapData = data;
	initMap(mapData.mapConfig);
}

function
initMap(config)
{
	console.log(mapData);
	new GMaps({
		div: '#map',
		lat: config.defaultLatitude,
		lng: config.defaultLongitude,
		zoom: config.defaultZoom
	});
}
