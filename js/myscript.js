var debug = true;

// if not in debug mode, we load data from an external server
if (debug) var mapDataUrl = 'json/data.json';
if (!debug) var mapDataUrl = 'http://node-test-nbwns.c9.io/discover_brussels/data/';

var mapData, myMap;

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
	myMap = initMap(mapData.mapConfig);
	placeHighlightsOnMap(mapData.highlights, myMap);
}

function
initMap(config)
{
	var map = new GMaps({
		div: '#map',
		lat: config.defaultLatitude,
		lng: config.defaultLongitude,
		zoom: config.defaultZoom
	});
	return map;
}

function
placeHighlightsOnMap(highlights, map)
{
	_(highlights).forEach(function(highlight) {
		map.addMarker({
			lat: highlight.latitude,
			lng: highlight.longitude,
			title: highlight.name
		});
	});
}



