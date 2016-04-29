var debug = true;

// if not in debug mode, we load data from an external server
if (debug) var dataUrl = 'json/data.json';
if (!debug) var dataUrl = 'http://node-test-nbwns.c9.io/discover_brussels/data/';

var sidebar, map, list;
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
	sidebar = new Sidebar($("#sidebar"));
	initHighlightsList("#highlights", data);
	map = new HighlightsMap($("#map"), data.mapConfig, data.highlights);
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
	sidebar.display(highlight);
	sidebar.show();
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
	close.click(this.hide());
}

// MAP

function
HighlightsMap(el, config, data)
{
	this._el = el;
	this._data = data;

	this._map = new GMaps({
		div: "#" + this._el.attr("id"),
		lat: config.defaultLatitude,
		lng: config.defaultLongitude,
		zoom: config.defaultZoom
	});

	var m = this._map;
	_(data).forEach(function(o) {
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

