$(document).ready(function(){
    init();
});

function
init()
{
	loadData();
	initMap();
}

function
loadData()
{

}

function
initMap()
{
	new GMaps({
		div: '#map',
		lat: 50.894941,
		lng: 4.341547
	});
}
