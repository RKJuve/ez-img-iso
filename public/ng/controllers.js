// controllers.js - base angular app for ez-img-iso
// ryan juve july 2014
//

'use strict';

/* Controllers */

angular.module('controllers', [])
.controller('MainCtrl', ['$scope', '$document',
  function($scope, $document) {
  	// Models
  	var Game = ISO.create({
  		target: 'inner'
  	});
  	$scope.CoPlayers = [];
  	$scope.IntegerWorld = Game.GenerateDemoWorld();
  	$scope.TileWorld = Game.CreateTileWorld($scope.IntegerWorld);
  	
  	Game.InitWorldDraw($scope.TileWorld);

  	var i = 0, max = $scope.TileWorld[0][0].length, landho;
  	for (i; i < max; i++) {
  		if ($scope.TileWorld[25][20][i] !== 0) {
  			landho = i-1;
  			break;
  		}
  	}

  	$scope.Player = Game.Player('Player 1', [25,20,landho], $scope.TileWorld);
  	// Player Creation

  	// Player Controls
  	$scope.moveTest = function(x, y, z) {
			$scope.Player.move(x,y,z);
		}
		$document.bind('keydown', function(e) {
			console.log(e.which);
			switch (e.which) {
				case 37:
					$scope.moveTest(1,0,0);
					$scope.Player.setFacing(3);
					break;
				case 38:
					$scope.moveTest(0,-1,0);
					$scope.Player.setFacing(0);
					break;
				case 39:
					$scope.moveTest(-1,0,0);
					$scope.Player.setFacing(1);
					break;
				case 40:
					$scope.moveTest(0,1,0);
					$scope.Player.setFacing(2);
					break;
			}
		})
  	// start up the world
  }]);