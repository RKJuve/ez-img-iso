// ez-canvas-iso.js
// a simple isometric graphics engine
// April 2014 - Ryan Juve

/////////
// GLOBALS
/////////
var gridSize = 40;
var APP = {};
APP.Canvases = {};


var target = document.getElementById('inner');

var targetCenter = {};
targetCenter.x = target.offsetWidth / 2;
targetCenter.y = target.offsetHeight / 2;

//needed params
//
//

function moveTest(x, y, z) {
	Chars[0].move(x,y,z);
}

function isoToCart(x, y, z) {
	var X =  y - x - 2;
	var Y = 0.5 * (x + y) + (z / 2);
	return { X: X, Y: Y};
}


var Player = function(name, position) {

	this.name = name;
	this.position = position;

	var cartOBJ = isoToCart(this.position[0], this.position[1], this.position[2]);

	console.log(cartOBJ);
	


	var X = targetCenter.x + (cartOBJ.X * gridSize) + 238,
	    Y = targetCenter.y + (cartOBJ.Y * gridSize) - 462

	this.htmlElement = new Image();
	this.htmlElement.src = 'blackmage.png';
	this.htmlElement.className = 'player';
	this.htmlElement.style.left = X + 'px'
	this.htmlElement.style.top = Y + 'px';
	this.htmlElement.style['z-index'] = (76 - (this.position[2] - this.position[1] - this.position[0]));

	target.appendChild(this.htmlElement);
	
	this.move = function(x,y,z) {
		if (World[this.position[0]+x][this.position[1]+y][this.position[2]+z] !== 0 && World[this.position[0]+x][this.position[1]+y][this.position[2]+z-1] === 0) {
			z -= 1;
		}  else if (World[this.position[0]+x][this.position[1]+y][this.position[2]+z+1] === 0 && World[this.position[0]+x][this.position[1]+y][this.position[2]+z+2] !== 0) {
			z += 1;
		}
		this.position = [this.position[0]+x, this.position[1]+y, this.position[2]+z]
		this.htmlElement.style['z-index'] = (76 - (this.position[2] - this.position[1] - this.position[0]));


		var cartOBJ = isoToCart(this.position[0], this.position[1], this.position[2]);
		var X = targetCenter.x + (cartOBJ.X * gridSize) + 240,
	    Y = targetCenter.y + (cartOBJ.Y * gridSize) - 462;
	    
		this.htmlElement.style.left = X + 'px'
		this.htmlElement.style.top = Y + 'px';
	}

	// setTimeout(this.move.bind(this, -1, 0, 0), 2000);
	// setTimeout(this.move.bind(this, 0, -1, 0), 3000);
	// setTimeout(this.move.bind(this, -1, 0, 0), 5000);

	return this;
}

var Chars = [];

Chars.push(new Player('test', [7, 5, 7]));

console.log(Chars);

// set up tile image
var Tile = function() {
	this.img = new Image();
	this.img.src = 'tiletest.png';
	this.img.className = 'tile';

	this.img.isVisible = function() {

		var rect = this.getClientRects()[0];

		var testPoints = [
			[1 + rect.left, 1 + rect.top + gridSize / 3],
			[rect.left + gridSize / 2, 1 +rect.top],
			[rect.right - 1, 1 + rect.top + gridSize / 3],
			[rect.left + gridSize / 2 - 5, rect.top + gridSize * 0.66666666],
			[rect.left + gridSize / 2 + 5, rect.top + gridSize * 0.66666666]
		]

		var visible = false;
		testPoints.forEach(function(el, index) {
			if ( document.elementFromPoint(el[0],el[1]) === this ) {
				visible = true;
			}
		}, this)

		if (!visible) {
			this.remove();
		}
	}

	this.setImage = function() {

	}

	return this;
}



function drawTile(x,y,z) {
	//console.log(z, y, x)
	var cartOBJ = isoToCart(x, y, z);
	


	var X = targetCenter.x + (cartOBJ.X * gridSize) + 220,
	    Y = targetCenter.y + (cartOBJ.Y * gridSize) - 450,
		x1 = X + gridSize,
		x2 = X + (gridSize * 2),
		y1 = Y - (gridSize * 0.5),
		y2 = Y + (gridSize * 0.5),
		y3 = Y + gridSize;


	var tile = new Tile();
		tile.img.style.left = X.toString() + 'px';
		tile.img.style.top = Y.toString() + 'px';
		tile.img.style['z-index'] = (75 - (z-y-x));
		//console.log(Y.toString())
	target.appendChild(tile.img)

	return tile;
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

	for (i = 0; i < World.length; i++) {
		for (j = 0; j < World[0].length; j++) {
			for (k = 0; k < World[0][0].length; k++) {
				if (World[i][j][k] === 1) {
					World[i][j][k] = drawTile(i,j,k);
				}
			}
		}
	}

})


$("#inner").draggable({ zIndex: 9999 });

// setTimeout(function(){
// 	console.log(World[0][0][8].img.getClientRects());
// 	setTimeout(function() {
// 		console.log(World[0][0][8].img.getClientRects());
// 	},2000);
// }, 2000);