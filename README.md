ez-img-iso
=============

trying img tags instead of canvas.
![v0.0.2](/etc/v0.0.2.png)

1. ```git clone https://github.com/RKJuve/ez-canvas-iso.git```
2. ```npm install```
3. ```npm start```
4. open browser to http://localhost:3000

### Usage:

#### Initialize Game object
```var Game = ISO.create({
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
  	});```


### TODO:
- fix character controls w/respect to view direction
- fix character movement audit:
	- no moving through walls
	- no flying
	- allow falling

- websockets + server-side api = multiplayer
