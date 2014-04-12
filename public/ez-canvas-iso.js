// ez-canvas-iso.js
// a simple isometric graphics engine
// April 2014 - Ryan Juve

/////////
// GLOBALS
/////////
var canvasCenter = (function(){
	var x = $('#canvas').width() / 2;
	var y = $('#canvas').height() / 2;
	return {x: x, y: y}
})()

function isoToCart(z, y, x) {
	var X =  2 * (y - x) - 2;
	var Y = x + y - (2 * z) + 1;
	return { X: X, Y: Y};
}
var i, j;

newArray.forEach(function(el, ind) {
	i = ind;
	el.forEach(function(el, ind){
		j = ind;
		el.forEach(function(el, ind) {
			isoToCart(i, j, ind);
		})
	})
})