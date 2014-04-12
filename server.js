// bring in express and underscore
var 	path = require("path"),
 	 express = require("express"),
       	   _ = require("underscore");

var buildDir = './public';

//set up the express app
var app = express()
        .use(express.static(buildDir));

// start node server
var port = process.env.PORT || 3000;
app.listen(port);
console.log("The server is now listening on port %s", port);