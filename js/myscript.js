var debug = true;

$(document).ready(function(){
	init();
});

function
init()
{
	$.stellar(); // PARALLAX

	// if not in debug mode, we load data from an external server
	if (debug) var dataUrl = 'json/data.json';
	if (!debug) var dataUrl = 'http://node-test-nbwns.c9.io/discover_brussels/data/';
	loadData(dataUrl);
}

function
loadData(url)
{
	$.getJSON(url, onDataLoaded);
}

function
onDataLoaded(data)
{
	var sidebar = new Sidebar($("#sidebar"));
	new HighlightsList($("#highlights"), data.highlights, sidebar);
	new HighlightsMap($("#map"), data.mapConfig, data.highlights, sidebar);
}

// LIST

function
HighlightsList(el, data, sidebar)
{	

	this._el = el;
	this._data = data;
	this._sidebare = sidebar;

	var template = _.template('<div data-page-url="<%- pageUrl %>" class="thumbnail"><img src="<%- picture %>" alt="<%- name %>"><div class="caption"><h3><%- name %></h3><p><%- abstract %></p><p><a class="btn btn-primary" data="<%- name %>"">Learn more</a></p></div></div>');

	_(data).forEach(function(o) {
		el.append(template(o));
	});

	el.find("a.btn").bind("click", {data: data, sidebar: sidebar}, function(event) {
		var name = event.target.attributes.data.value;
		var o = _.find(event.data.data, {name: name} );
		console.log(o);
		event.data.sidebar.display(o);
		event.data.sidebar.show();
	});
}

// SIDEBAR

function
Sidebar(el)
{
	this._el = el;
	this._header = this._el.children("h2").first();
	this._content = this._el.children("div.content").first();

	this.hide = function()
	{
		this._el.animate({right: '-300'}, 300);
	}

	this.show = function()
	{
		this._el.animate({right: '0'}, 300);
	}

	this.display = function(data)
	{
		this._header.text(data.name);
		this._content.load(data.pageUrl);
	}

	var close = this._el.children('#close').first();
	close.removeAttr('href');
	close.bind("click", {sidebar: this}, function(event) {
		event.data.sidebar.hide();
	});
}

// MAP

function
HighlightsMap(el, config, data, sidebar)
{
	this._el = el;
	this._data = data;
	this._sidebar = sidebar;

	this._map = new GMaps({
		div: "#" + this._el.attr("id"),
		lat: config.defaultLatitude,
		lng: config.defaultLongitude,
		zoom: config.defaultZoom
	});

	var m = this._map;
	_(this._data).forEach(function(o) {
		m.addMarker({
			lat: o.latitude,
			lng: o.longitude,
			title: o.name,
			details: o,
			click: function(marker) {
				sidebar.display(marker.details)
				sidebar.show();
			}
		});
	});
}

