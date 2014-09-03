// bring in express and underscore
var 	path = require("path"),
 	 express = require("express"),
       	   _ = require("underscore"),
       	 ISO = require("./public/ez-img-iso.js");

var buildDir = './public';

//set up the express app
var app = express()
        .use(express.static(buildDir))
        .use(express.static('./etc'));

//set up socket io
var server = require('http').Server(app);
var io = require('socket.io')(server, {
	pingTimeout: 120000,
	pingInterval: 2000
});

io.on('connection', function (socket) {
	var player;

	socket.on('newplayer', function(data) {

		player = data.name;
		players[data.name] = {
			position: data.position,
			facing: data.facing
		}

		console.log('---new player--', data);
		socket.broadcast.emit('newplayer', data);
	})

	socket.on('playerLeave', function(data) {
		console.log('-player leave-', data);
		delete players[player];
		socket.broadcast.emit('removePlayer', player);
	});

	socket.on('moveUpdate', function(data) {
		players[data.name].position = data.position;
		players[data.name].facing = data.facing;
		socket.broadcast.emit('move', data);
	})

	socket.on('addBlock', function(data) {
		console.log('--add--', data);
		World[data.x][data.y][data.z] = data.type;
		socket.broadcast.emit('addBlock', data);
	})

	socket.on('removeBlock', function(data) {
		console.log('--remove--', data);
		World[data.x][data.y][data.z] = 0;
		socket.broadcast.emit('removeBlock', data);
	})

});


// state variables.... todo: dreplace with db

var players = {};


//api

app.get('/api/world', function(req, res) {
	res.send(World);
});

app.get('/api/players', function(req, res) {
	console.log('----players----', players);
	res.send(players);
})

//game vars

var Game = ISO.create({});

var World = Game.GenerateIntWorld();

// start node server
var port = process.env.PORT || 3001;
server.listen(port);
console.log("The server is now listening on port %s", port);