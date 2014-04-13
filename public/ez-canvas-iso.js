// ez-canvas-iso.js
// a simple isometric graphics engine
// April 2014 - Ryan Juve

/////////
// GLOBALS
/////////
var gridSize = 25;
var APP = {};


var c1 = document.getElementById('canvas1');
var c2 = document.getElementById('canvas2');
var c3 = document.getElementById('canvas3');
c1.width = $('body').width();
c1.height = 500;
c2.width = $('body').width();
c2.height = 500;
c3.width = $('body').width();
c3.height = 500;
// var ctx = c.getContext('2d');

var canvasCenter = (function(){
	var x = $('#canvas1').width() / 2;
	var y = $('#canvas1').height() / 4;
	return {x: x, y: y}
})()

function isoToCart(z, y, x) {
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
				cartOBJ = isoToCart(i, j, ind);

				var X = canvasCenter.x + (cartOBJ.X * gridSize),
				    Y = canvasCenter.y + (cartOBJ.Y * gridSize),
					x1 = X + gridSize,
					x2 = X + (gridSize * 2),
					y1 = Y - (gridSize * 0.5),
					y2 = Y + (gridSize * 0.5),
					y3 = Y + gridSize;

				el = c1.getContext('2d');
				el.fillStyle = '#006600';
				el.strokeStyle = '#010101';
				el.beginPath();
				el.moveTo(X, Y);
				el.lineTo(x1, y1);
				el.lineTo(x2, Y);
				el.lineTo(x1, y2);
				el.closePath();
				el.stroke();
				el.fill();

				el.fillStyle = '#926239';
				el.beginPath();
				el.moveTo(X, Y);
				el.lineTo(x1, y2);
				el.lineTo(x1, y3);
				el.lineTo(X, y2);
				el.closePath();
				el.stroke();
				el.fill();

				el.beginPath();
				el.moveTo(x1, y2);
				el.lineTo(x2, Y);
				el.lineTo(x2, y2);
				el.lineTo(x1, y3);
				el.closePath();
				el.stroke();
				el.fill();			

		}
	})
})
});
// var ctx = c.getContext('2d');

//     ctx.fillRect(25,25,100,100);
//     ctx.clearRect(45,45,60,60);
//     ctx.strokeRect(50,50,50,50);