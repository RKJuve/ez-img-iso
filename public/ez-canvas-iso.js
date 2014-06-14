// ez-canvas-iso.js
// a simple isometric graphics engine
// April 2014 - Ryan Juve

/////////
// GLOBALS
/////////
var gridSize = 40;
var APP = {};
APP.Canvases = {};


//needed params
//
// max depth,  so can get half for 'half-(z-y-x)'
//
//
//
//
//
//

// set up tile image
var Tile = function() {
	var img = new Image();
	img.src = 'tiletest.png';
	img.className = 'tile';
	return img;
}

var target = document.getElementById('inner');

var targetCenter = {};
targetCenter.x = target.offsetWidth / 2;
targetCenter.y = target.offsetHeight / 2;

function isoToCart(x, y, z) {
	var X =  y - x - 2;
	var Y = 0.5 * (x + y) + (z / 2);
	return { X: X, Y: Y};
}
function drawTile(x,y,z) {
	//console.log(z, y, x)
	var cartOBJ = isoToCart(x, y, z);
	


	var X = targetCenter.x + (cartOBJ.X * gridSize) + 20,
	    Y = targetCenter.y + (cartOBJ.Y * gridSize) - 800,
		x1 = X + gridSize,
		x2 = X + (gridSize * 2),
		y1 = Y - (gridSize * 0.5),
		y2 = Y + (gridSize * 0.5),
		y3 = Y + gridSize;


	var img = new Tile();
		img.style.left = X.toString() + 'px';
		img.style.top = Y.toString() + 'px';
		img.style['z-index'] = (75 - (z-y-x));
		//console.log(Y.toString())
	target.appendChild(img)
	return img;
}

function redraw(container, array) {
	// $(container).children().remove().promise().done(function(){
		// console.log('----deleted----');

		jQuery.when((function(){
			console.log('----generate----');
			array = GenerateWorld(array);
		})()).done(function(){

			var x = array.length,
				y = array[0].length,
				z = array[0][0].length;
				//console.log(z);

			for (i = 0; i < x; i++) {
				for (j = 0; j < y; j++) {
					for (k = 0; k < z; k++) {
						if (array[i][j][k] === 1) {
							drawTile(i,j,k);
						}
					}
				}
			}
		});
	// })
}

$(document).ready(function(){

	for (i = 0; i < newArray.length; i++) {
		for (j = 0; j < newArray[0].length; j++) {
			for (k = 0; k < newArray[0][0].length; k++) {
				if (newArray[i][j][k] === 1) {
					newArray[i][j][k] = drawTile(i,j,k);
				}
			}
		}
	}

})


$("#inner").draggable({ zIndex: 9999 });