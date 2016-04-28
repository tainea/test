var debug = true;

// if not in debug mode, we load data from an external server
if (debug) var mapDataUrl = 'json/data.json';
if (!debug) var mapDataUrl = 'http://node-test-nbwns.c9.io/discover_brussels/data/';

var mapData, myMap;

var sidebar;

$(document).ready(function(){
    init();
});

function
init()
{
	initSidebar();
	loadMapData();
}

function
initSidebar()
{

	sidebar = $("#sidebar");
	var close = $("#close");
	close.removeAttr('href')
	close.click(hideSidebar);
}

function
showSidebar()
{
	sidebar.animate({right: '0'}, 300);
}

function
hideSidebar(e)
{
	e.stopPropagation();
	sidebar.animate({right: '-300'}, 300);
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
			title: highlight.name,
			details: highlight,
			click: onClickMarker
		});
	});
}

function
onClickMarker(marker)
{
	console.log(marker);
	updateSidebar(marker.details)
	showSidebar();
}

function
updateSidebar(data)
{
	sidebar.children("h2").first().text(data.name);
	sidebar.children("div").last().load(data.pageUrl);
}


