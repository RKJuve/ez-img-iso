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
					temp[i][j].push(1);
			}			
		}
 	}
 	return temp;
}

function GenerateWorld(array, opts) {
	function genHill(num) {
		for (i = 0; i < num; i++) {
			var apex = {};
				apex.x = 6,
				apex.y = 8,
				apex.z = 0;
			console.log(apex);
			for (i = apex.z; i < z; i++) {
				for (j = (0 - i); j < (1 + i); j++) {
					for (k = (0 - i); k < (1 + i); k++) {
						console.log(k + ', ' + j + ', ' + i)
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
var newArray = Array3d(16,16,4);
endTime = performance.now();
console.log("done!! took %s seconds", ((endTime-startTime)/1000));

// newArray = GenerateWorld(newArray)
