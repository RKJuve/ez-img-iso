

// ez-img-iso.js
// a simple isometric graphics engine
// April 2014 - Ryan Juve
// namespace/module


ISO = (function(){
	function Game(opts) {
		/*  example options hash
		  {
			target: '#renderTargetSelector',
			gridSize: 40, // size in px of XY grid
			tileHeight: 1,  // height of tiles in grid units
			tiles: {		// tile type object
				1: {
	  				type: 'grass',
	  				imgsrc: 'etc/tiletest.png',

	  			},
	  			2: {
	  				type: 'rock',
	  				imgsrc: 'etc/rock.png',

	  			}
			}
		  }
		*/


		//params/globals/private vars/split by function?
		var target = document.getElementById(opts.target);
		var gridSize = opts.gridSize || 40;

		var TileHash = opts.tiles;

		var targetCenter = {};
		targetCenter.x = target.offsetWidth / 2;
		targetCenter.y = target.offsetHeight / 2;

		//private game variables

		var viewDir = 0;

		// translates 3d array coordinates into xy cartesian coordinates,
		// takes into account a given view rotation
		// thisArg must be TileWorld
		function isoToCart(x, y, z) {
			switch (viewDir) {
				case 0:
					break;
				case 1:
					var maxY = this[0].length;
					var temp = y
					y = (maxY - 1) - x;
					x = temp;
					break;
				case 2:
					var maxX = this.length,
						maxY = this[0].length;
					x = x + (maxX - 1) - (x * 2);
					y = y + (maxY - 1) - (y * 2);
					break;
				case 3:
					var maxX = this[0].length;
					var temp = x
					x = (maxX - 1) - y;
					y = temp;
					break;

			}


			var X =  y - x - 2;
			var Y = (x/2) + (y/2) + (z/2);
			return { X: X, Y: Y};
		}
		// returns a z-index for an element based on its x,y,z position and
		// the current view direction
		function gameZ(x,y,z) {
			switch (viewDir) {
				case 0:
					var zIndex = (200 - (z-y-x)*2);
					break;
				case 1:
					var zIndex = (200 - (z-y+x)*2);
					break;
				case 2:
					var zIndex = (200 - (z+y+x)*2);
					break;
				case 3:
					var zIndex = (200 - (z+y-x)*2);
					break;
			}
			return zIndex;
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
						temp[i][j].push(0);	
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
						apex.z = Math.ceil( Math.random() * (z/2) + 1 );
					// console.log(apex);
					
					for (var i = apex.z; i < z; i += 1) {

						for (var j = (apex.z - i); j < (i - apex.z)+hillWidth; j += 1) {

							for (var k = (apex.z - i); k < (i - apex.z)+hillWidth; k += 1) {

								var newX = Math.max(0,Math.min(x-1,apex.x+k)),
								    newY = Math.max(0,Math.min(y-1,apex.y+j)),
								    newZ = Math.max(0,Math.min(z,i));
							    
							    array[newX][newY][newZ] = 1;

							}
						}
					}
				}
			}

			function addRock(depth, jitter, randWeight) {
				for (var i = 0; i < x; i++) {
					for (var j = 0; j < y; j++) {
						var counter = (Math.random() - 1) * jitter;
						var trigger = false;
						for (var k = 0; k < z; k++) {
							if (trigger) {
								array[i][j][k] = 2;
								continue;
							}
							if (array[i][j][k] === 1) {
								counter++;
								if (counter > depth) {
									trigger = true;
								}
								if ( (Math.random() * counter) > randWeight ) {
									array[i][j][k] = 2;
								}
							}
						}
					}
				}
			}


			genHill(opts.hills);
			addRock(7, 3, 1.1);

			return array;
		}
		function GenerateForest(world, entities, numTrees) {
			var i = 0;

			var X = world.length;
			var Y = world[0].length;
			var Z = world[0][0].length;

			while (i < numTrees) {

				var x = Math.floor(Math.random() * X);
				var y = Math.floor(Math.random() * Y);

				for (var z = 0; z < Z; z++) {
					if (world[x][y][z] instanceof Tile) {
						entities.push(new Tree(x,y,z-1));
						break;
					}
				}

				i++;
			}
		}

		function Tree(x,y,z) {

			this.position = [x,y,z];

			this.imgSrc = 'tree.png';

			this.rendered = false;

			this.renderImage = function() {
				var cartOBJ = isoToCart(this.position[0],this.position[1],this.position[2]);
				var X = targetCenter.x + (cartOBJ.X * gridSize) + 232,
				    Y = targetCenter.y + (cartOBJ.Y * gridSize) - 985;

				this.img = new Image();
				this.img.src = this.imgSrc;
				this.img.className = 'tree';
				this.img.style.left = X.toString() + 'px';
				this.img.style.top = Y.toString() + 'px';

				this.img.style.zIndex = gameZ(this.position[0],this.position[1],this.position[2]);
				this.img.style['-webkit-filter'] = 'brightness('+((90 - ((this.position[2]*3)-this.position[1]-this.position[0]))/90)+')'

				target.appendChild(this.img);
				
				this.rendered = true;
			}


			return this;
		}

		// tile helper functions
		function getTileImgSrc(tileNum) {
			if (TileHash[tileNum]) {
				return TileHash[tileNum].imgsrc;
			}
		};
		function getTileType(tileNum) {
			if (TileHash[tileNum]) {
				return TileHash[tileNum].type;
			}
		};
		// Tile object factory
		function Tile(tileNum) {
			this.type = getTileType(tileNum);
			this.imgSrc = getTileImgSrc(tileNum);
			this.rendered = false;

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

			// this.render = function() {
			// 	var x = this.position[0],
			// 		y = this.position[1],
			// 		z = this.position[2];
				
			// 	var cartOBJ = isoToCart(x,y,z);
			// 	var X = targetCenter.x + (cartOBJ.X * gridSize) + 220,
			// 	    Y = targetCenter.y + (cartOBJ.Y * gridSize) - 950;

			// 	this.img = new Image();
			// 	this.img.src = 'tiletest.png';
			// 	this.img.className = 'tile';
			// 	this.img.style.left = X.toString() + 'px';
			// 	this.img.style.top = Y.toString() + 'px';
			// 	this.img.style['z-index'] = (75 - (z-y-x));

			// 	target.appendChild(this.img);
			// }

			this.removeElement = function() {
				if (this.img) {
					target.removeChild(this.img);
					this.rendered = false;
				}
			}

			return this;
		}
		// Returns a Player object with a given name and position

		function Player(opts, world) {
			this.name = opts.name || 'New Player';
			this.position = opts.position;
			this.facing = opts.facing || 0;

			this.world = world;

			this.frontImageUrl = opts.frontImageUrl;
			this.backImageUrl = opts.backImageUrl;

			return this;
		}

		Player.prototype.renderElement = function() {
			var cartOBJ = isoToCart.call(this.world, this.position[0], this.position[1], this.position[2]);

			var X = targetCenter.x + (cartOBJ.X * gridSize) + 240,
			    Y = targetCenter.y + (cartOBJ.Y * gridSize) - 955;

			this.htmlElement = document.createElement('div');
			this.htmlElement.style.backgroundImage = 'url(player.png)',
			this.htmlElement.className = 'player',
			this.htmlElement.style.left = X + 'px',
			this.htmlElement.style.top = Y + 'px',
			this.htmlElement.style.zIndex = gameZ(this.position[0], this.position[1], this.position[2]) + 1;

			//facing
			switch ( (this.facing + viewDir) % 4 ) {
				case 0:
					this.htmlElement.style.backgroundPosition = '0px 54px';
					break;
				case 1:
					this.htmlElement.style.backgroundPosition = '40px 0px';
					break;
				case 2:
					this.htmlElement.style.backgroundPosition = '0px 0px';
					break;
				case 3:
					this.htmlElement.style.backgroundPosition = '40px 54px';
					break;
			}

			target.appendChild(this.htmlElement);
		};

		Player.prototype.updateElement = function() {
			var cartOBJ = isoToCart.call(this.world, this.position[0], this.position[1], this.position[2]);

			var X = targetCenter.x + (cartOBJ.X * gridSize) + 240,
			    Y = targetCenter.y + (cartOBJ.Y * gridSize) - 955;

			this.htmlElement.style.left = X + 'px',
			this.htmlElement.style.top = Y + 'px',
			this.htmlElement.style.zIndex = gameZ(this.position[0], this.position[1], this.position[2]) + 1;

			//facing
			switch ( (this.facing + viewDir) % 4 ) {
				case 0:
					this.htmlElement.style.backgroundPosition = '0px 54px';
					break;
				case 1:
					this.htmlElement.style.backgroundPosition = '40px 0px';
					break;
				case 2:
					this.htmlElement.style.backgroundPosition = '0px 0px';
					break;
				case 3:
					this.htmlElement.style.backgroundPosition = '40px 54px';
					break;
			}
		};

		Player.prototype.removeElement = function() {
			target.removeChild(this.htmlElement);
		};

		Player.prototype.setFacing = function(direction) {
			console.log(direction);
			this.facing = direction;
		};

		Player.prototype.moveNotPossible = function() {
			console.log('noooop');
		};

		Player.prototype.fall = function() {
			var falling = true;
			while (falling) {
				if (this.world[this.position[0]][this.position[1]][this.position[2]+1] !== 0) {
					falling = false;
				} else {
					this.jumpTo(this.position[0],this.position[1],this.position[2]+1);
				}
			}
		};

		Player.prototype.move = function(direction) {
			console.log(direction);

			switch (direction) {
				case 0:
					var newPos = [this.position[0]-1,this.position[1],this.position[2]];
					break;
				case 1:
					var newPos = [this.position[0],this.position[1]+1,this.position[2]];
					break;
				case 2:
					var newPos = [this.position[0]+1,this.position[1],this.position[2]];
					break;
				case 3:
					var newPos = [this.position[0],this.position[1]-1,this.position[2]];
					break;
			}

			////if possible
			//if position doesnt exist in world
			if (this.world[newPos[0]][newPos[1]][newPos[2]] === undefined) {
				this.moveNotPossible();
				return;
			}
			//if spot is blocked
			if (this.world[newPos[0]][newPos[1]][newPos[2]-1] !== 0) {
				this.moveNotPossible();
				return;
			}
			////if climb
			if (this.world[newPos[0]][newPos[1]][newPos[2]] !== 0 && this.world[newPos[0]][newPos[1]][newPos[2]-1] === 0 && this.world[newPos[0]][newPos[1]][newPos[2]-2] === 0) {
				this.jumpTo(newPos[0],newPos[1],newPos[2]-1);
				return;
			}
			////if flat move
			this.jumpTo(newPos[0],newPos[1],newPos[2]);
			////if fall
			if (this.world[newPos[0]][newPos[1]][newPos[2]+1] === 0) {
				this.fall();
			}
			return;
		};

		Player.prototype.jumpTo = function(x,y,z) {
			this.position = [x,y,z];
			this.updateElement();

		};

		Player.prototype.relativeFacing = function() {

		};





		// draw fcn
		function Draw(World, startPoint) {
			var toCheckArray = [], checkedHash = {}, maxX, maxY, maxZ;
			switch (viewDir) {
				case 0:
					maxXview = World.length-1;
					maxYview = World[0].length-1;
					maxZview = World[0][0].length;
					break;
				case 1:
					maxXview = 0;
					maxYview = World[0].length-1;
					maxZview = World[0][0].length;
					break;
				case 2: 
					maxXview = 0;
					maxYview = 0;
					maxZview = World[0][0].length;
					break;
				case 3:
					maxXview = World.length-1;
					maxYview = 0;
					maxZview = World[0][0].length;
					break;
			}
			maxX = World.length;
			maxY = World[0].length;
			maxZ = World[0][0].length;

			toCheckArray.push(startPoint);
			checkedHash[0+','+0+','+0] = true;
			
			while (toCheckArray.length > 0) {// there are still Coords to check
				var x = toCheckArray[0][0],
					y = toCheckArray[0][1],
					z = toCheckArray[0][2];
					
				if (World[x][y][z] === 0) {
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
				} else if (World[x][y][z] instanceof Tile) {
					World.renderTile(x,y,z);
					if ( (x === maxXview || y === maxYview) && z + 1 < maxZ ) {
						toCheckArray.push([x,y,z+1]);
					}
				} else {
					console.log('----WAT----', World[x][y][z], x,y,z);

				}
				toCheckArray.shift();
			}
		}
		function DrawFromPoint(World, startPoint) {
			var toCheckArray = [], checkedHash = {}, maxX, maxY, maxZ;
			maxX = World.length;
			maxY = World[0].length;
			maxZ = World[0][0].length;

			toCheckArray.push(startPoint);
			checkedHash[0+','+0+','+0] = true;
			
			while (toCheckArray.length > 0) {// there are still Coords to check
				var x = toCheckArray[0][0],
					y = toCheckArray[0][1],
					z = toCheckArray[0][2];
					
				if (World[x][y][z] === 0) {
					if (x-1 > 0 && checkedHash[(x-1)+','+y+','+z] !== true) {
						checkedHash[(x-1)+','+y+','+z] = true;
						toCheckArray.push([x-1,y,z]);
					}
					if (y-1 > 0 && checkedHash[x+','+(y-1)+','+z] !== true) {
						checkedHash[x+','+(y-1)+','+z] = true;
						toCheckArray.push([x,y-1,z]);
					}
					if (z+1 < maxZ && checkedHash[x+','+y+','+(z+1)] !== true) {
						checkedHash[x+','+y+','+(z+1)] = true;
						toCheckArray.push([x,y,z+1]);
					}
				} else if (World[x][y][z] instanceof Tile) {
					World.renderTile(x,y,z);
					if (x === maxX - 1 || y === maxY - 1) {
						toCheckArray.push([x,y,z+1]);
					}
				} else {
					console.log('----WAT----', World[x][y][z], x,y,z);
				}
				toCheckArray.shift();
			}
		}
		// createtileworld
		function TileWorld(array) {
			var X = array.length,
				Y = array[0].length,
				Z = array[0][0].length;

			console.log(this);

			//var TileWorld = Array3d(X,Y,0);

			var x,y,z;
			for (x = 0; x < X; x++) {
				this[x] = [];
				for (y = 0; y < Y; y++) {
					this[x][y] = [];
					for (z = 0; z < Z; z++) {
						switch (array[x][y][z]) {
							case 0:
								this[x][y].push(0);
								break;
							default:
								this[x][y].push(new Tile(array[x][y][z]));
								break;
						}
					}
				}
			}

			this.length = X;	

			return this;
		}

		TileWorld.prototype.addTile = function(type, coordinates) {
			var x = coordinates[0],
				y = coordinates[1],
				z = coordinates[2];

			if (this[x][y][z] === 0) {
				this[x][y][z] = new Tile(2);
				this.renderTile(x,y,z);
			}
		};
		TileWorld.prototype.removeTile = function(x,y,z) {
			if (this[x][y][z] instanceof Tile) {
				this[x][y][z].removeElement();
				this[x][y][z] = 0;
			} else {
				console.log('----tried to remove a non Tile----');
			}
		};

		TileWorld.prototype.renderTile = function(x,y,z) {
			if (this[x][y][z] instanceof Tile && this[x][y][z].rendered === false ) {

				var cartOBJ = isoToCart.call(this,x,y,z);
				var X = targetCenter.x + (cartOBJ.X * gridSize) + 220,
				    Y = targetCenter.y + (cartOBJ.Y * gridSize) - 950;

				var tile = this[x][y][z];
				tile.img = new Image();
				tile.img.src = tile.imgSrc;
				tile.img.className = 'tile';
				tile.img.style.left = X.toString() + 'px';
				tile.img.style.top = Y.toString() + 'px';

				tile.img.style.zIndex = gameZ(x,y,z);
				tile.img.style['-webkit-filter'] = 'brightness('+((90 - ((z*3)-y-x))/90)+')'

				target.appendChild(tile.img);
				
				this[x][y][z].rendered = true;

			}
		};

		TileWorld.prototype.clearRenderedElements = function() {
			var X = this.length,
				Y = this[0].length,
				Z = this[0].length;

			var x,y,z;

			for (x = 0; x < X; x++) {
				for (y = 0; y < Y; y++) {
					for (z = 0; z < Z; z++) {
						if (this[x][y][z] && this[x][y][z].rendered === true) {
							this[x][y][z].removeElement();
						}
					}
				}
			}
		}

		return {
			'world': [],
			'entities': [],
			'localPlayer': {},
			'remotePlayers': [],
			'getViewDir': function() {
				return viewDir;
			},
			'setViewDir': function(newDir) {
				this.world.clearRenderedElements();
				this.localPlayer.removeElement();
				viewDir = newDir;
				Draw(this.world, [0,0,0]);
				this.localPlayer.renderElement();
				return viewDir;
			},
			'createLocalPlayer': function(opts) {
				this.localPlayer = new Player(opts, this.world);
				this.localPlayer.setFacing(1);
				this.localPlayer.renderElement();
				return this.localPlayer;
			},
			'initDraw': function() {
				Draw(this.world, [0,0,0]);
				this.entities.forEach(function(el) {
					el.renderImage();
				})
			},
			'redrawFromPoint': function(x,y,z) {
				DrawFromPoint(this.world, [x,y,z]);
			},
			'GenerateDemoWorld': function() {
				this.world = new TileWorld(GenerateDemoWorld(Array3d(28,28,18), {hills: 7}));
				GenerateForest(this.world, this.entities, 77);

				return this.world;
			}
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