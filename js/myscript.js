var debug = true;

// if not in debug mode, we load data from an external server
if (debug) var mapDataUrl = 'json/data.json';
if (!debug) var mapDataUrl = 'http://node-test-nbwns.c9.io/discover_brussels/data/';

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
	console.log(mapData);
	initMap(mapData.mapConfig);
}

function
initMap(config)
{
	new GMaps({
		div: '#map',
		lat: config.defaultLatitude,
		lng: config.defaultLongitude,
		zoom: config.defaultZoom
	});
}
