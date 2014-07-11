/*

sizeof.js

A function to calculate the approximate memory usage of objects

Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

/* Returns the approximate memory usage, in bytes, of the specified object. The
 * parameter is:
 *
 * object - the object whose size should be determined
 */
function sizeof(object){

  // initialise the list of objects and size
  var objects = [object];
  var size    = 0;

  // loop over the objects
  for (var index = 0; index < objects.length; index ++){

    // determine the type of the object
    switch (typeof objects[index]){

      // the object is a boolean
      case 'boolean': size += 4; break;

      // the object is a number
      case 'number': size += 8; break;

      // the object is a string
      case 'string': size += 2 * objects[index].length; break;

      // the object is a generic object
      case 'object':

        // if the object is not an array, add the sizes of the keys
        if (Object.prototype.toString.call(objects[index]) != '[object Array]'){
          for (var key in objects[index]) size += 2 * key.length;
        }

        // loop over the keys
        for (var key in objects[index]){

          // determine whether the value has already been processed
          var processed = false;
          for (var search = 0; search < objects.length; search ++){
            if (objects[search] === objects[index][key]){
              processed = true;
              break;
            }
          }

          // queue the value to be processed if appropriate
          if (!processed) objects.push(objects[index][key]);

        }

    }

  }

  // return the calculated size
  return size;

}



// ez-img-iso.js
// a simple isometric graphics engine
// April 2014 - Ryan Juve

// namespace/module

ISO = (function(){
	var Game = function(opts) {
		/*  example options hash
		  {
			target: '#renderTargetSelector',
			gridSize: 40, // size in px of XY grid
			tileHeight: 1  // height of tiles in grid units
		  }
		*/

		// assign Game  Globals
		var target = document.getElementById(opts.target);
		var gridSize = opts.gridSize || 40;

		var targetCenter = {};
		targetCenter.x = target.offsetWidth / 2;
		targetCenter.y = target.offsetHeight / 2;

		// translates 3d array coordinates into xy cartesian coordinates
		function isoToCart(x, y, z) {
			var X =  y - x - 2;
			var Y = (x/2) + (y/2) + (z/2);
			return { X: X, Y: Y};
		}
		// helper function to create 3d arrays of zeroes
		function Array3d(x,y,z) {
			var temp = [];
			for (i = 0; i < x; i++) {
				temp.push([]);
			}
			for (i = 0; i < x; i++) {
				for (j = 0; j < y; j++) {
					temp[i].push([]);			
				}
		 	}
		 	for (i = 0; i < x; i++) {
				for (j = 0; j < y; j++) {
					for (k = 0; k < z; k++) {
						if (k === z-1) {
							temp[i][j].push(1);
						} else {
							temp[i][j].push(0);	
						}
					}
				}			
			}
		 	return temp;
		}
		// takes in a (hopefully empty) 3d array and an object hash 
		// and returns an IntegerWorld
		//var IntegerWorld = GenerateWorld(Array3d(32,32,32), {hills: 17});
		function GenerateDemoWorld(array, opts) {

			var x = array.length,
				y = array[0].length,
				z = array[0][0].length;

			function genHill(num) {
				for (var hill = 0; hill < num; hill++) {
					var hillWidth = Math.floor(7 + Math.random() * 4)

					var apex = {};
						apex.x = Math.floor( Math.random() * x ),
						apex.y = Math.floor( Math.random() * y ),
						apex.z = Math.ceil( Math.random() * z/2 );
					// console.log(apex);
					
					for (var i = apex.z; i < z; i += 1) {

						for (var j = (apex.z - i); j < (i - apex.z)+hillWidth; j += 1) {

							for (var k = (apex.z - i); k < (i - apex.z)+hillWidth; k += 1) {

								var newX = Math.max(0,Math.min(x-1,apex.x+k)),
								    newY = Math.max(0,Math.min(y-1,apex.y+j)),
								    newZ = Math.max(0,Math.min(z,i));
							    
							    if (array[newX][newY][newZ] === 0) {
							    	array[newX][newY][newZ] = 1;
							    }
							}
						}
					}
				}
			}


			genHill(opts.hills);

			return array;
		}
		//
		var getTileImgSrc = function(tileNum) {
			// hash of tile number keys with img src values
			return;
		};
		var getTileType = function(tileNum) {
			// hash of tile number keys with tile type string values
			return;
		};
		// set up tile image
		var Tile = function(tileNum, position) {

			this.type = getTileType(tileNum);
			this.imgSrc = getTileImgSrc(tileNum);
			this.position = position;

			// method to check if image is visible in document
			// this.img.isVisible = function() {

			// 	var rect = this.getClientRects()[0];

			// 	var testPoints = [
			// 		[1 + rect.left, 1 + rect.top + gridSize / 3],
			// 		[rect.left + gridSize / 2, 1 +rect.top],
			// 		[rect.right - 1, 1 + rect.top + gridSize / 3],
			// 		[rect.left + gridSize / 2 - 5, rect.top + gridSize * 0.66666666],
			// 		[rect.left + gridSize / 2 + 5, rect.top + gridSize * 0.66666666]
			// 	]

			// 	var visible = false;
			// 	testPoints.forEach(function(el, index) {
			// 		if ( document.elementFromPoint(el[0],el[1]) === this ) {
			// 			visible = true;
			// 		}
			// 	}, this)

			// 	if (!visible) {
			// 		this.remove();
			// 	}
			// }

			this.render = function() {
				var x = this.position[0],
					y = this.position[1],
					z = this.position[2];
				
				var cartOBJ = isoToCart(x,y,z);
				var X = targetCenter.x + (cartOBJ.X * gridSize) + 220,
				    Y = targetCenter.y + (cartOBJ.Y * gridSize) - 950;

				this.img = new Image();
				this.img.src = 'tiletest.png';
				this.img.className = 'tile';
				this.img.style.left = X.toString() + 'px';
				this.img.style.top = Y.toString() + 'px';
				this.img.style['z-index'] = (75 - (z-y-x));

				target.appendChild(this.img);
			}

			return this;
		}
		// Returns a Player object with a given name and position
		var Player = function(name, position, TileWorld) {

			var cartOBJ = isoToCart(position[0], position[1], position[2]);

			var X = targetCenter.x + (cartOBJ.X * gridSize) + 235,
			    Y = targetCenter.y + (cartOBJ.Y * gridSize) - 962

			var htmlElement = document.createElement('div');
			htmlElement.style.backgroundImage = "url('player.png')",
			htmlElement.className = 'player',
			htmlElement.style.left = X + 'px',
			htmlElement.style.top = Y + 'px',
			htmlElement.style['z-index'] = (75 - (position[2] - position[1] - position[0]));

			target.appendChild(htmlElement);
			
			var move = function(x,y,z) {
				if (TileWorld[this.position[0]+x][this.position[1]+y][this.position[2]+z] !== 0 && TileWorld[this.position[0]+x][this.position[1]+y][this.position[2]+z-1] === 0) {
					z -= 1;
				}  else if (TileWorld[this.position[0]+x][this.position[1]+y][this.position[2]+z+1] === 0 && TileWorld[this.position[0]+x][this.position[1]+y][this.position[2]+z+2] !== 0) {
					z += 1;
				}
				this.position = [this.position[0]+x, this.position[1]+y, this.position[2]+z]
				this.htmlElement.style['z-index'] = (75 - (this.position[2] - this.position[1] - this.position[0]));


				var cartOBJ = isoToCart(this.position[0], this.position[1], this.position[2]);
				var X = targetCenter.x + (cartOBJ.X * gridSize) + 235,
			    Y = targetCenter.y + (cartOBJ.Y * gridSize) - 962;
			    
				this.htmlElement.style.left = X + 'px'
				this.htmlElement.style.top = Y + 'px';
			}

			var setFacing = function(directionInt) {
				switch (directionInt) {
					case 0:
						this.facing = 0;
						this.htmlElement.style.backgroundPosition = '50px 68px';
						break;
					case 1:
						this.facing = 1;
						this.htmlElement.style.backgroundPosition = '0px 68px';
						break;
					case 2:
						this.facing = 2;
						this.htmlElement.style.backgroundPosition = '50px 0px';
						break;
					case 3:
						this.facing = 3;
						this.htmlElement.style.backgroundPosition = '0px 0px';
						break;
				}
			}
			return {
				name: name,
				position: position,
				facing: 0,
				setFacing: setFacing,
				move: move,
				htmlElement: htmlElement
			}
		}
		// draw fcn
		function Draw(TileWorld) {
			var toCheckArray = [], checkedHash = {}, maxX, maxY, maxZ;
			maxX = TileWorld.length;
			maxY = TileWorld[0].length;
			maxZ = TileWorld[0][0].length;

			toCheckArray.push([0,0,0]);
			checkedHash[0+','+0+','+0] = true;
			
			while (toCheckArray.length > 0) {// there are still Coords to check
				var x = toCheckArray[0][0],
					y = toCheckArray[0][1],
					z = toCheckArray[0][2];
					
				if (TileWorld[x][y][z] === 0) {
					if (x+1 < maxX && checkedHash[(x+1)+','+y+','+z] !== true) {
						checkedHash[(x+1)+','+y+','+z] = true;
						toCheckArray.push([x+1,y,z]);
					}
					if (y+1 < maxY && checkedHash[x+','+(y+1)+','+z] !== true) {
						checkedHash[x+','+(y+1)+','+z] = true;
						toCheckArray.push([x,y+1,z]);
					}
					if (z+1 < maxZ && checkedHash[x+','+y+','+(z+1)] !== true) {
						checkedHash[x+','+y+','+(z+1)] = true;
						toCheckArray.push([x,y,z+1]);
					}
				} else if (TileWorld[x][y][z] instanceof Tile) {
					TileWorld[x][y][z].render();
					if (x === maxX - 1 || y === maxY - 1) {
						toCheckArray.push([x,y,z+1]);
					}
				}
				toCheckArray.shift();
			}
		}
		return {
			'GenerateDemoWorld': function() {
			var IntegerWorld = GenerateDemoWorld(Array3d(32,32,32), {hills: 7})
			return IntegerWorld;
			},
			'CreateTileWorld': function(array) {
				var X = array.length,
					Y = array[0].length,
					Z = array[0][0].length;

				var TileWorld = Array3d(X,Y,0);

				var x,y,z;
				for (x = 0; x < X; x++) {
					for (y = 0; y < Y; y++) {
						for (z = 0; z < Z; z++) {
							switch (array[x][y][z]) {
								case 0:
									TileWorld[x][y].push(0);
									break;
								case 1:
									TileWorld[x][y].push(new Tile('dirt', [x,y,z]));
									break;
							}
						}
					}
				}	

				return TileWorld;
			},
			'InitWorldDraw': function(TileWorld) {
				Draw(TileWorld);
				return;
			},
			'Player': Player
		}
	} // end game fcn

	return {
		create: function(opts) {
			/*  example options hash
			  {
				target: '#renderTargetSelector',
				gridSize: 40, // size in px of XY grid
				tileHeight: 1  // height of tiles in grid units
			  }
			*/

			return new Game(opts);
		}
	}
})();

$(document).ready(function(){
	//Draw();
	$("#inner").draggable({ zIndex: 9999 });
})