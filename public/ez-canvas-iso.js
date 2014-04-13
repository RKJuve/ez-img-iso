// ez-canvas-iso.js
// a simple isometric graphics engine
// April 2014 - Ryan Juve

/////////
// GLOBALS
/////////
var gridSize = 25;
var APP = {};
APP.Canvases = {};

$('canvas').each(function() {
	APP.Canvases[this.id] = this;
	APP.Canvases[this.id].width = $('body').width();
	APP.Canvases[this.id].height = 500;
	console.log(this);
})

var canvasCenter = (function(){
	var x = $('#canvas1').width() / 2;
	var y = $('#canvas1').height() / 16;
	return {x: x, y: y}
})()

function isoToCart(x, y, z) {
	var X =  -x + y - 2;
	var Y = 0.5 * (x + y) - (z / 2) + 1;
	return { X: X, Y: Y};
}
// var i, j;

newArray.forEach(function(el, ind) {
	i = ind;
	el.forEach(function(el, ind){
		j = ind;
		el.forEach(function(el, ind) {

			if (el === 1) {
				var cartOBJ = isoToCart(i, j, ind);
				var canvas = APP.Canvases['c'+(ind+i+j)];


				var X = canvasCenter.x + (cartOBJ.X * gridSize),
				    Y = canvasCenter.y + (cartOBJ.Y * gridSize),
					x1 = X + gridSize,
					x2 = X + (gridSize * 2),
					y1 = Y - (gridSize * 0.5),
					y2 = Y + (gridSize * 0.5),
					y3 = Y + gridSize;

				el = canvas.getContext('2d');
				el.fillStyle = '#006600';
				el.strokeStyle = '#005500';
				el.lineJoin = 'round';
				el.lineWidth = 1.5;
				el.beginPath();
				el.moveTo(X, Y);
				el.lineTo(x1, y1);
				el.lineTo(x2, Y);
				el.lineTo(x1, y2);
				el.closePath();
				el.stroke();
				el.fill();

				el.fillStyle = '#926239';
				el.strokeStyle = '#423229';

				el.beginPath();
				el.moveTo(X, Y);
				el.lineTo(x1, y2);
				el.lineTo(x1, y3);
				el.lineTo(X, y2);
				el.closePath();
				el.stroke();
				el.fill();

				// var grd = c1.createLinearGradient(X,Y,(X+gridSize),(Y+gridSize));
				// grd.addColorStop(0,"#926239");
				// grd.addColorStop(1,"#926200");

				// el.fillStyle = grd;

				el.beginPath();
				el.moveTo(x1, y2);
				el.lineTo(x2, Y);
				el.lineTo(x2, y2);
				el.lineTo(x1, y3);
				el.closePath();
				el.stroke();
				el.fill();

				// shading
				el.strokeStyle = 'rgba(35, 29, 0, 0.5)';	
				el.beginPath();
				el.moveTo(x2, y2);
				el.lineTo(x2, (y2 - 1));
				el.lineTo(x1, (y3 - 1));
				el.lineTo(X, (y2 - 1));
				el.lineTo(X, y2);
				el.lineTo(x1, y3);
				el.closePath();
				el.stroke();			

		}
	})
})
});
// var ctx = c.getContext('2d');

//     ctx.fillRect(25,25,100,100);
//     ctx.clearRect(45,45,60,60);
//     ctx.strokeRect(50,50,50,50);