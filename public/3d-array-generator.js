var Queue =  function(){
	this.priorityArray = [];
	this.hash = {
	};
};

Queue.prototype.enqueue = function(value, priority) {
	// if new priority, set up array. else push value onto array
	if (!this.hash[priority]) {
		this.hash[priority] = [value];
	} else {
		this.hash[priority].push(value);
	}
	// if new priority is >= than old max,
	// add new priority to front of priorityArray,
	// else add new priority to end of priorityArray and then sort descending
	if (priority >= this.priorityArray[0]) {
		this.priorityArray.unshift(priority);
	} else {
		this.priorityArray.push(priority);
		this.priorityArray.sort(function(a,b){
			return b - a;
		});
	}
};

Queue.prototype.dequeue = function() {
	// shift value to return from bucket
	var toReturn = this.hash[this.priorityArray[0]].shift();
	// shift value off priorityArray
	this.priorityArray.shift();

	return toReturn;
};

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

function GenerateWorld(array, opts) {
	function genHill(num) {
		for (i = 0; i < num; i++) {
			var apex = {};
				apex.x = 5,
				apex.y = 5,
				apex.z = 3;
			// console.log(apex);
			for (i = apex.z; i < z; i++) {
				for (j = -i; j < (1 + i); j++) {
					for (k = -i; k < (1 + i); k++) {
						// console.log(k + ', ' + j + ', ' + i)
						array[apex.x + k][apex.y + j][i] = 1;
					}
				}
			}
		}
	}

	var x = array.length,
		y = array[0].length,
		z = array[0][0].length;

	genHill(1);
	console.log(array);
	return array;
}

var startTime = performance.now();
var newArray = Array3d(9,9,4);
endTime = performance.now();
// console.log("done!! took %s seconds", ((endTime-startTime)/1000));

// newArray = GenerateWorld(newArray)
newArray = [
	[
		[0,0,0,1],
		[0,0,0,1],
		[0,0,0,1],
		[0,0,0,1],
		[1,1,1,1],
		[0,0,0,1],
		[0,0,0,1],
		[1,1,1,1]
	],[
		[0,0,0,1],
		[0,0,1,1],
		[0,0,1,1],
		[0,0,1,1],
		[0,0,1,1],
		[0,0,1,1],
		[0,0,0,1],
		[0,0,0,0]
	],[
		[0,0,0,1],
		[0,0,1,1],
		[0,1,1,1],
		[0,1,1,1],
		[0,1,1,1],
		[0,0,1,1],
		[0,0,0,1],
		[0,0,0,0]
	],[
		[0,0,0,1],
		[0,0,1,1],
		[0,1,1,1],
		[1,1,1,1],
		[0,1,1,1],
		[0,0,1,1],
		[0,0,0,1],
		[0,0,0,0]
	],[
		[0,0,0,1],
		[0,0,1,1],
		[0,1,1,1],
		[0,1,1,1],
		[0,1,1,1],
		[0,0,1,1],
		[0,0,0,1],
		[0,0,0,0]
	],[
		[0,0,0,1],
		[0,0,1,1],
		[0,0,1,1],
		[0,0,1,1],
		[0,0,1,1],
		[0,0,1,1],
		[0,0,0,1],
		[0,0,0,1]
	],[
		[0,0,0,1],
		[0,0,0,1],
		[0,0,0,1],
		[0,0,0,1],
		[0,0,0,1],
		[0,0,0,1],
		[0,0,0,1],
		[0,0,0,1]
	],[
		[1,1,1,1],
		[0,1,1,1],
		[0,0,1,1],
		[0,0,0,1],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,1]
	]
]