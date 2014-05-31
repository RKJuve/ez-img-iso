// ez-canvas-iso.js
// a simple isometric graphics engine
// April 2014 - Ryan Juve

/////////
// GLOBALS
/////////
var gridSize = 20;
var APP = {};
APP.Canvases = {};

// set up tile image
var Tile = new Image();
	Tile.src = 'tiletest.png';




$('canvas').each(function() {
	APP.Canvases[this.id] = this;
	this.width = 600;
	this.height = 600;
})

var canvasCenter = (function(){
	var x = $('#c1').width() / 2;
	var y = $('#c1').height() / 16;
	return {x: x, y: y}
})()

function isoToCart(x, y, z) {
	var X =  y - x - 2;
	var Y = 0.5 * (x + y) + (z / 2) + 1;
	return { X: X, Y: Y};
}
function drawTile(x,y,z) {
	var cartOBJ = isoToCart(x, y, z);
	var canvas = APP.Canvases['c'+(50-(z-y-x))];
	console.log(canvas.id);

	var X = canvasCenter.x + (cartOBJ.X * gridSize),
	    Y = canvasCenter.y + (cartOBJ.Y * gridSize),
		x1 = X + gridSize,
		x2 = X + (gridSize * 2),
		y1 = Y - (gridSize * 0.5),
		y2 = Y + (gridSize * 0.5),
		y3 = Y + gridSize;
	console.log(X +', '+Y)
	el = canvas.getContext('2d');
	
	el.drawImage(Tile, X, Y);
	// Old draw method
	//////////
	// el.fillStyle = '#006600';
	// el.strokeStyle = '#005500';
	// el.lineJoin = 'round';
	// el.lineWidth = 1.5;
	// el.beginPath();
	// el.moveTo(X, Y);
	// el.lineTo(x1, y1);
	// el.lineTo(x2, Y);
	// el.lineTo(x1, y2);
	// el.closePath();
	// el.stroke();
	// el.fill();

	// el.fillStyle = '#926239';
	// el.strokeStyle = '#423229';

	// el.beginPath();
	// el.moveTo(X, Y);
	// el.lineTo(x1, y2);
	// el.lineTo(x1, y3);
	// el.lineTo(X, y2);
	// el.closePath();
	// el.stroke();
	// el.fill();

	// // var grd = c1.createLinearGradient(X,Y,(X+gridSize),(Y+gridSize));
	// // grd.addColorStop(0,"#926239");
	// // grd.addColorStop(1,"#926200");

	// // el.fillStyle = grd;

	// el.beginPath();
	// el.moveTo(x1, y2);
	// el.lineTo(x2, Y);
	// el.lineTo(x2, y2);
	// el.lineTo(x1, y3);
	// el.closePath();
	// el.stroke();
	// el.fill();

	// // shading
	// el.strokeStyle = 'rgba(35, 29, 0, 0.5)';	
	// el.beginPath();
	// el.moveTo(x2, y2);
	// el.lineTo(x2, (y2 - 1));
	// el.lineTo(x1, (y3 - 1));
	// el.lineTo(X, (y2 - 1));
	// el.lineTo(X, y2);
	// el.lineTo(x1, y3);
	// el.closePath();
	// el.stroke();
}

var queue = new Queue();
var counter = 0;


Tile.onload = function() {
// draw newArray as isotiles
for (i = 0; i < newArray.length; i++) {
	for (j = 0; j < newArray[0].length; j++) {
		for (k = 0; k < newArray[0][0].length; k++) {
			if (newArray[i][j][k] === 1) {
				counter++;
				queue.enqueue([i,j,k], (50-(k-j-i)) );
			}
		}
	}
}
for (i = counter; i > 0; i--) {
	var temp = queue.dequeue()
	drawTile(temp[0],temp[1],temp[2]);	
}
}