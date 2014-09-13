ez-img-iso
=============
![v0.0.3](/etc/v0.0.3.png)

1. ```git clone https://github.com/RKJuve/ez-img-iso.git```
2. ```npm install```
3. ```npm start```
4. open browser to http://localhost:3001

### TODO:
*sooner:*
- rebuild character element so image, label, and say bubbles can be different z-indexes.  Should also allow for more 'modular' character art
- refine the way objects are stored, rendered, and interacted with
- reimplement image.isVisible method, so character outlines when behind objects can be attempted

- update Usage guide

- build new controls for demo game

*later:*
- NPCS?!?!
- more generalized api for generating and rendering world
- separate front-end and back-end modules


### Usage:

#### Initialize Game object
```
var Game = ISO.create({
  		target: 'inner',
  		tiles: {
  			1: {
  				type: 'grass',
  				imgsrc: 'grass.png'
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

