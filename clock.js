var d, placeholder;
function update_clock() {
	d = new Date();
	placeholder.innerHTML = d.toLocaleTimeString();
}

document.addEventListener("DOMContentLoaded", function () {
	placeholder = document.getElementById("clock");
	setInterval(update_clock, 1000);
});
