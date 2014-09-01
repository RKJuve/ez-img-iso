// controllers.js - base angular app for ez-img-iso
// ryan juve july 2014
//

'use strict';

/* Controllers */

angular.module('controllers', [])
.controller('MainCtrl', ['$scope', '$document',
  function($scope, $document) {


	$("#inner").draggable({ zIndex: 9999 });


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
  	$scope.CoPlayers = [];
  	$scope.World = Game.GenerateDemoWorld();
  	console.log($scope.World)
  	Game.initDraw();

  	//$scope.TileWorld = Game.CreateTileWorld($scope.IntegerWorld);
  	
  	//Game.InitWorldDraw($scope.TileWorld);

  	var i = 0, max = $scope.World[0][0].length, landho;
  	for (i; i < max; i++) {
  		if ($scope.World[25][20][i] !== 0) {
  			landho = i-1;
  			break;
  		}
  	}

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

  	// Player Creation
  	$scope.Player = Game.createLocalPlayer({
  		name: 'Player 1',
  		position: [25,20,landho]
  	});

  	// Player Controls

  	//movement
	$document.bind('keydown', function(e) {
		//console.log($scope.Player);
		// console.log(e);
		switch (e.which) {
			case 78:
				$scope.removeBlock();
				break;
			case 77:
				$scope.addBlock();
				break;
			case 37:
			var direction = ((2 + Game.getViewDir()*3) % 4);
				if (!e.shiftKey) {
					$scope.Player.move(direction);	
				}
				$scope.Player.setFacing(direction);
				$scope.Player.updateElement();
				break;
			case 38:
			var direction = ((3 + Game.getViewDir()*3) % 4);
				if (!e.shiftKey) {
					$scope.Player.move(direction);
					
				}
				$scope.Player.setFacing(direction);
				$scope.Player.updateElement();
				break;
			case 39:
			var direction = ((0 + Game.getViewDir()*3) % 4);
				if (!e.shiftKey) {
					$scope.Player.move(direction);
					
				}
				$scope.Player.setFacing(direction);
				$scope.Player.updateElement();
				break;
			case 40:
			var direction = ((1 + Game.getViewDir()*3) % 4);
				if (!e.shiftKey) {
					$scope.Player.move(direction);
					
				}
				$scope.Player.setFacing(direction);
				$scope.Player.updateElement();
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
				}
				break;
			case 1:
				if ($scope.World[px][py+1][pz] === 0) {
					$scope.World.addTile(2, [px,py+1,pz]);
				}
				break;
			case 2:
				if ($scope.World[px+1][py][pz] === 0) {
					$scope.World.addTile(2, [px+1,py,pz]);
				}
				break;
			case 3:
				if ($scope.World[px][py-1][pz] === 0) {
					$scope.World.addTile(2, [px,py-1,pz]);
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
				}
				break;
			case 1:
				if ($scope.World[px][py+1][pz] !== 0) {
					$scope.World.removeTile(px,py+1,pz);
					Game.redrawFromPoint(px,py+1,pz);
				}
				break;
			case 2:
				if ($scope.World[px+1][py][pz] !== 0) {
					$scope.World.removeTile(px+1,py,pz);
					Game.redrawFromPoint(px+1,py,pz);
				}
				break;
			case 3:
				if ($scope.World[px][py-1][pz] !== 0) {
					$scope.World.removeTile(px,py-1,pz);
					Game.redrawFromPoint(px,py-1,pz);
				}
				break;
		}
	}
  	// start up the world
  }]);