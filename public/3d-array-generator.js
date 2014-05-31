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
				if (k === (z-1) ) {
					temp[i][j].push(1);
				} else {
					temp[i][j].push(0);
				}
			}
		}			
	}
 	
 	return temp;
}

function GenerateWorld(array, opts) {

	var x = array.length,
		y = array[0].length,
		z = array[0][0].length;

	function genHill(num) {
		for (var hill = 0; hill < num; hill++) {
			var apex = {};
				apex.x = Math.floor( Math.random() * x ),
				apex.y = Math.floor( Math.random() * y ),
				apex.z = Math.floor( Math.random() * z );
			 console.log(apex);
			
			for (var i = apex.z; i < z; i += 1) {

				for (var j = -(i - apex.z); j < i; j += 1) {

					for (var k = -(i - apex.z); k < i; k += 1) {

						var newX = Math.max(0,Math.min(x-1,apex.x+k)),
						    newY = Math.max(0,Math.min(y-1,apex.y+j)),
						    newZ = Math.max(0,Math.min(z,i));
					    
					    array[newX][newY][newZ] = 1;
					}
				}
			}
		}
	}


	genHill(1);
	// console.log(array);
	return array;
}

var newArray = Array3d(16,16,8);

newArray = GenerateWorld(newArray);

