// controllers.js - base angular app for ez-img-iso
// ryan juve july 2014
//

'use strict';

/* Controllers */

angular.module('controllers', [])
.controller('MainCtrl', ['$scope', '$document',
  function($scope, $document) {

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

  	window.game = Game;

  	var socket;

  	$.get('/api/world', function(data) {
  		$scope.World = Game.TileizeWorld(data);
  		Game.initDraw();

  		$.get('/api/players', function(data) {
  			var keys = Object.keys(data);
  			var len = keys.length;
  			var i = 0;

  			while (i < len) {

  				Game.createRemotePlayer({
					name: keys[i],
					position: data[keys[i]].position,
					facing: data[keys[i]].facing
				});
  			
  				i++;
  			}
  		})

  		socket = io.connect('/');

  		window.onbeforeunload = function(){
	    	socket.emit('playerLeave', Game.localPlayer.info());
	    }

	    $scope.$on('$destroy', function() {
		    window.onbeforeunload = undefined;
		});

  		socket.on('newplayer', function(data) {
			Game.createRemotePlayer({
				name: data.name,
				position: data.position,
				facing: data.facing
			});
  		})

  		socket.on('move', function(data) {
  			Game.remotePlayers[data.name].updateInfo(data)
  			Game.remotePlayers[data.name].updateElement();
  		});

  		socket.on('removePlayer', function(data) {
  			Game.removeRemotePlayer(data);
  		});

  		socket.on('addBlock', function(data) {
  			$scope.World.addTile(data.type, [data.x,data.y,data.z])
  		});

  		socket.on('removeBlock', function(data) {
  			$scope.World.removeTile(data.x,data.y,data.z);
  			Game.redrawFromPoint(data.x,data.y,data.z);
  		});

  		socket.on('playerSay', function(data) {
  			Game.remotePlayers[data[0]].say(data[1]);
  		});
  	})

	//player say

	$scope.toSay;

	$scope.playerSayWhat = function() {
		$scope.Player.say($scope.toSay);
		socket.emit('playerSay', [$scope.Player.name, $scope.toSay]);
		$scope.toSay = '';
	}


  	// player creation
  	$scope.submit = function() {
  		if ($scope.playerName) {

		  	var i = 0, max = $scope.World[0][0].length, landho;
		  	for (i; i < max; i++) {
		  		if ($scope.World[25][20][i] !== 0) {
		  			landho = i-1;
		  			break;
		  		}
		  	}

		  	var pos = [25,20,landho];

  			$scope.Player = Game.createLocalPlayer({
		  		name: $scope.playerName,
		  		position: pos,
		  		facing: 1
		  	});

  			socket.emit('newplayer', {
  				name: $scope.playerName,
  				position: pos,
  				facing: 1
  			});

  			$scope.playerCreated = true;
  			$("#inner").draggable({ zIndex: 9999 });
  		}
  	}
  	//$scope.TileWorld = Game.CreateTileWorld($scope.IntegerWorld);
  	
  	//Game.InitWorldDraw($scope.TileWorld);



  	//world rotation ctrls
  	$scope.rotateWorld = function(changeInt) {
  		var curViewDir = Game.getViewDir();

  		var newViewDir = curViewDir + changeInt;

  		if (newViewDir === -1) {
  			newViewDir = 3;
  		} else if (newViewDir === 4) {
  			newViewDir = 0;
  		}

  		Game.setViewDir(newViewDir);
  	}

  	// Player Controls

  	//movement
	$document.bind('keydown', function(e) {
		//console.log($scope.Player);
		// console.log(e);
		switch (e.which) {
			case 90:
				$scope.removeBlock();
				break;
			case 88:
				$scope.addBlock();
				break;
			case 37:
			var direction = ((2 + Game.getViewDir()*3) % 4);
				if (!e.shiftKey) {
					$scope.Player.move(direction);	
				}
				$scope.Player.setFacing(direction);
				$scope.Player.updateElement();
				socket.emit('moveUpdate', Game.localPlayer.info() );
				break;
			case 38:
			var direction = ((3 + Game.getViewDir()*3) % 4);
				if (!e.shiftKey) {
					$scope.Player.move(direction);
					
				}
				$scope.Player.setFacing(direction);
				$scope.Player.updateElement();
				socket.emit('moveUpdate', Game.localPlayer.info() );
				break;
			case 39:
			var direction = ((0 + Game.getViewDir()*3) % 4);
				if (!e.shiftKey) {
					$scope.Player.move(direction);
					
				}
				$scope.Player.setFacing(direction);
				$scope.Player.updateElement();
				socket.emit('moveUpdate', Game.localPlayer.info() );
				break;
			case 40:
			var direction = ((1 + Game.getViewDir()*3) % 4);
				if (!e.shiftKey) {
					$scope.Player.move(direction);
					
				}
				$scope.Player.setFacing(direction);
				$scope.Player.updateElement();
				socket.emit('moveUpdate', Game.localPlayer.info() );
				break;
		}
	})

	// remove block
	$scope.addBlock = function() {
		var px = $scope.Player.position[0];
		var py = $scope.Player.position[1];
		var pz = $scope.Player.position[2];

		switch ($scope.Player.facing) {
			case 0:
				if ($scope.World[px-1][py][pz] === 0) {
					$scope.World.addTile(2, [px-1,py,pz]);
					socket.emit('addBlock', {
						x: (px-1),
						y: py,
						z: pz,
						type: 2
					})
				}
				break;
			case 1:
				if ($scope.World[px][py+1][pz] === 0) {
					$scope.World.addTile(2, [px,py+1,pz]);
					socket.emit('addBlock', {
						x: px,
						y: (py+1),
						z: pz,
						type: 2
					})
				}
				break;
			case 2:
				if ($scope.World[px+1][py][pz] === 0) {
					$scope.World.addTile(2, [px+1,py,pz]);
					socket.emit('addBlock', {
						x: (px+1),
						y: py,
						z: pz,
						type: 2
					})
				}
				break;
			case 3:
				if ($scope.World[px][py-1][pz] === 0) {
					$scope.World.addTile(2, [px,py-1,pz]);
					socket.emit('addBlock', {
						x: px,
						y: (py-1),
						z: pz,
						type: 2
					})
				}
				break;
		}
	}

	// remove block
	$scope.removeBlock = function() {

		var px = $scope.Player.position[0];
		var py = $scope.Player.position[1];
		var pz = $scope.Player.position[2];

		switch ($scope.Player.facing) {
			case 0:
				if ($scope.World[px-1][py][pz] !== 0) {
					$scope.World.removeTile(px-1,py,pz);
					Game.redrawFromPoint(px-1,py,pz);
					socket.emit('removeBlock', {
						x: (px-1),
						y: py,
						z: pz
					})
				}
				break;
			case 1:
				if ($scope.World[px][py+1][pz] !== 0) {
					$scope.World.removeTile(px,py+1,pz);
					Game.redrawFromPoint(px,py+1,pz);
					socket.emit('removeBlock', {
						x: px,
						y: (py+1),
						z: pz
					})
				}
				break;
			case 2:
				if ($scope.World[px+1][py][pz] !== 0) {
					$scope.World.removeTile(px+1,py,pz);
					Game.redrawFromPoint(px+1,py,pz);
					socket.emit('removeBlock', {
						x: (px+1),
						y: py,
						z: pz
					})
				}
				break;
			case 3:
				if ($scope.World[px][py-1][pz] !== 0) {
					$scope.World.removeTile(px,py-1,pz);
					Game.redrawFromPoint(px,py-1,pz);
					socket.emit('removeBlock', {
						x: px,
						y: (py-1),
						z: pz
					})
				}
				break;
		}
	}
  	// start up the world
  }]);