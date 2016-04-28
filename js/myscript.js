var debug = true;

// if not in debug mode, we load data from an external server
if (debug) var dataUrl = 'json/data.json';
if (!debug) var dataUrl = 'http://node-test-nbwns.c9.io/discover_brussels/data/';

var sidebar;
var template;
var highlights;

$(document).ready(function(){
    init();
});

function
init()
{
	loadData(dataUrl);
	initParallax();
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
	initHighlightsList("#highlights", data);
	initMap('#map', data);
}

//PARALLAX

function
initParallax()
{
	$.stellar();
}

// HIGHLIGHTS

function
initHighlightsList(el, data)
{
	var el  = $(el);

	highlights = data.highlights;

	template = _.template('<div data-page-url="<%- pageUrl %>" class="thumbnail"><img src="<%- picture %>" alt="<%- name %>"><div class="caption"><h3><%- name %></h3><p><%- abstract %></p><p><a class="btn btn-primary" data="<%- name %>"">Learn more</a></p></div></div>');

	_(highlights).forEach(function(highlight) {
		el.append(template(highlight));
	});
	el.find("a.btn").each(function() {
		$(this).click(onClickLearnMore)
	});
}

function
onClickLearnMore(e)
{
	var name = e.target.attributes.data.value;
	var highlight = _.find(highlights, {name: name} );
	console.log(highlight);
	updateSidebar(highlight);
	showSidebar();
}

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
	markHighlightsOnMap(data.highlights, map);
}

function
markHighlightsOnMap(highlights, map)
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

