ez-img-iso
=============
![v0.0.2](/etc/v0.0.2.png)

1. ```git clone https://github.com/RKJuve/ez-canvas-iso.git```
2. ```npm install```
3. ```npm start```
4. open browser to http://localhost:3000

### Usage:

#### Initialize Game object
```
var Game = ISO.create({
  		target: 'inner',
  		tiles: {
  			1: {
  				type: 'grass',
  				imgsrc: 'tiletest.png'
  			},
  			2: {
  				type: 'rock',
  				imgsrc: 'rock.png'
  			}
  		}
  	});
```
**target:** the ID of the page element to render the game in
**tiles:** a hash of tile type numbers (starting at 1, as 0 is always empty space), needed properties are *type*: the name of the tile, and *imgsrc*: a url where that tile's image can be found

#### Generate and render the demo world
```
var World = Game.GenerateDemoWorld();
Game.initDraw();
```

#### Add a local player
```
var Player = Game.createLocalPlayer('Player 1', [x,y,z]);
```
first argument is player name, second is [x, y, z] position of player

### Game Object methods/properties
- 'world': 3d array of the game world
- 'localPlayer': where the local player object is created
- 'remotePlayers': array of remote player objects
- 'getViewDir()': returns current game view direction
- 'setViewDir(int)': accepts integers 0-3, sets game view direction
- 'createLocalPlayer(name, position)': name = string, position = [x, y, z]
- 'initDraw()': draws entire world
- 'redrawFromPoint(x,y,z)': redraws world from a given point
- *temp =>*'GenerateDemoWorld()': generates a demo world  

### World Object methods/properties
- 'addTile(type, position)': type = tile type number, position = [x, y, z] coordinates
- 'removeTile(x,y,z)': removes tile at x,y,z
- 'renderTile(x,y,z)': renders tile at x,y,z to target element
- 'clearRenderedElements()': removes all rendered world elements from target

### Player Object methods/properties
- 'name': duh
- 'position': [x,y,z] position of player in world
- 'facing': absolute direction player is facing
- 'renderElement()': renders player element to game target
- 'removeElement()': removes player element from DOM
- 'setFacing(int)': sets players facing to the absolute direction supplied
- 'move(x,y,z)': moves player relative to current position **this should change..**

### TODO:
*sooner:*
- fix character controls w/respect to view direction
- fix character movement audit:
	- no moving through walls
	- no flying
	- allow falling

- websockets + server-side api = multiplayer

*later:*
- more generalized api for generating and rendering world