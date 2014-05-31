// ez-canvas-iso.js
// a simple isometric graphics engine
// April 2014 - Ryan Juve

/////////
// GLOBALS
/////////
var gridSize = 40;
var APP = {};
APP.Canvases = {};


for (i = 0; i < 150; i++) {
	var temp = document.createElement('canvas')
	temp.id = 'c' + i;
	temp.style['z-index'] = i;
	$('#inner').append(temp);
}

// set up tile image
var Tile = new Image();
	Tile.src = 'tiletest.png';




$('canvas').each(function() {
	APP.Canvases[this.id] = this;
	this.width = 1400;
	this.height = 800;
})

var canvasCenter = (function(){
	var x = $('#c1').width() / 2;
	var y = $('#c1').height() / 16;
	return {x: x, y: y}
})()

function isoToCart(x, y, z) {
	var X =  y - x - 2;
	var Y = 0.5 * (x + y) + (z / 2);
	return { X: X, Y: Y};
}
function drawTile(x,y,z) {
	var cartOBJ = isoToCart(x, y, z);
	var canvas = APP.Canvases[('c'+(75-(z-y-x)))];
	//console.log(canvas.id);

	var X = canvasCenter.x + (cartOBJ.X * gridSize) + 20,
	    Y = canvasCenter.y + (cartOBJ.Y * gridSize) - 100,
		x1 = X + gridSize,
		x2 = X + (gridSize * 2),
		y1 = Y - (gridSize * 0.5),
		y2 = Y + (gridSize * 0.5),
		y3 = Y + gridSize;
	//console.log(canvas)
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

function redraw(container, array) {
	$(container).children().remove().promise().done(function(){
		console.log('----deleted----');

		jQuery.when((function(){
			console.log('----generate----');
			array = GenerateWorld(array);
		})()).done(function(){
			console.log('----yup----')
			for (i = 0; i < 150; i++) {
				var temp = document.createElement('canvas')
				temp.id = 'c' + i;
				temp.style['z-index'] = i;
				$('#inner').append(temp);
			}

			$('canvas').each(function() {
				APP.Canvases[this.id] = this;
				this.width = 1400;
				this.height = 800;
			})
			var x = array.length,
				y = array[0].length,
				z = array[0][0].length;
				console.log(z);

			for (i = 0; i < x; i++) {
				for (j = 0; j < y; j++) {
					for (k = 0; k < z; k++) {
						if (array[i][j][k] === 1) {
							drawTile(i,j,k);
						}
					}
				}
			}
		})
	})
	// .then(function(){
	// 	console.log('----yup----')
	// }, function() {
	// 	console.log('----narp----');
	// })
}

Tile.onload = function() {
// draw newArray as isotiles
for (i = 0; i < newArray.length; i++) {
	for (j = 0; j < newArray[0].length; j++) {
		for (k = 0; k < newArray[0][0].length; k++) {
			if (newArray[i][j][k] === 1) {
				drawTile(i,j,k);
			}
		}
	}
}
};

$("#inner").draggable({ zIndex: 9999 });