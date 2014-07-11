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

  	//movement
  	$scope.moveTest = function(x, y, z) {
			$scope.Player.move(x,y,z);
		}
	$document.bind('keydown', function(e) {
		switch (e.which) {
			case 32:
				$scope.removeBlock();
				break;
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

	// remove block
	$scope.removeBlock = function() {

		var px = $scope.Player.position[0];
		var py = $scope.Player.position[1];
		var pz = $scope.Player.position[2];

		switch ($scope.Player.facing) {
			case 0:
				if ($scope.TileWorld[px][py-1][pz] !== 0) {
					$scope.TileWorld[px][py-1][pz].remove();
					$scope.TileWorld[px][py-1][pz] = 0;
					$scope.TileWorld[px][py-1][pz+1].render();
					if (!($scope.TileWorld[px][py-2][pz].img)) {
						$scope.TileWorld[px][py-2][pz].render();
					}
				}
				break;
			case 1:
				if ($scope.TileWorld[px-1][py][pz] !== 0) {
					$scope.TileWorld[px-1][py][pz].remove();
					$scope.TileWorld[px-1][py][pz] = 0;
					$scope.TileWorld[px-1][py][pz+1].render();
					if (!($scope.TileWorld[px-2][py][pz].img)) {
						$scope.TileWorld[px-2][py][pz].render();
					}
				}
				break;
			case 2:
				if ($scope.TileWorld[px][py+1][pz] !== 0) {
					$scope.TileWorld[px][py+1][pz].remove();
					$scope.TileWorld[px][py+1][pz] = 0;
					$scope.TileWorld[px][py+1][pz+1].render();
					if (!($scope.TileWorld[px][py+2][pz].img)) {
						$scope.TileWorld[px][py+2][pz].render();
					}
				}
				break;
			case 3:
				if ($scope.TileWorld[px+1][py][pz] !== 0) {
					$scope.TileWorld[px+1][py][pz].remove();
					$scope.TileWorld[px+1][py][pz] = 0;
					$scope.TileWorld[px+1][py][pz+1].render();
					if (!($scope.TileWorld[px+2][py][pz].img)) {
						$scope.TileWorld[px+2][py][pz].render();
					}
				}
				break;
		}
	}
  	// start up the world
  }]);