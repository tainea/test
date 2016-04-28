var debug = true;

// if not in debug mode, we load data from an external server
if (debug) var dataUrl = 'json/data.json';
if (!debug) var dataUrl = 'http://node-test-nbwns.c9.io/discover_brussels/data/';

var myMap;
var sidebar;

$(document).ready(function(){
    init();
});

function
init()
{
	loadData(dataUrl);
}

function
loadData(url)
{
	$.getJSON(dataUrl, onDataLoaded);
}

function
onDataLoaded(data)
{
	initSidebar("#sidebar");
	initMap('#map', data);
}

// HIGHLIGHTS



// SIDEBAR

function
initSidebar(el)
{
	sidebar = $(el);
	var close = sidebar.children('#close').first();
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
	sidebar.animate({right: '-300'}, 300);
}

function
updateSidebar(data)
{
	sidebar.children("h2").first().text(data.name);
	sidebar.children("div.content").first().load(data.pageUrl);
}

// MAP

function
initMap(el, data)
{
	var config = data.mapConfig;
	var map = new GMaps({
		div: el,
		lat: config.defaultLatitude,
		lng: config.defaultLongitude,
		zoom: config.defaultZoom
	});
	placeHighlightsOnMap(data.highlights, map);
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
	updateSidebar(marker.details)
	showSidebar();
}

