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
				} 
				// else if (j > 5 && j < 8 && i > 5 && i < 8) {
				// 	temp[i][j].push(1);
				// }
				 else {
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
			var hillWidth = Math.floor(1 + Math.random() * 4)

			var apex = {};
				apex.x = Math.floor( Math.random() * x ),
				apex.y = Math.floor( Math.random() * y ),
				apex.z = Math.ceil( Math.random() * z );
			 console.log(apex);
			
			for (var i = apex.z; i < z; i += 1) {

				for (var j = (apex.z - i); j < (i - apex.z)+hillWidth; j += 1) {

					for (var k = (apex.z - i); k < (i - apex.z)+hillWidth; k += 1) {

						var newX = Math.max(0,Math.min(x-1,apex.x+k)),
						    newY = Math.max(0,Math.min(y-1,apex.y+j)),
						    newZ = Math.max(0,Math.min(z,i));
					    
					    if (array[newX][newY][newZ] === 0) {
					    	array[newX][newY][newZ] = 1;
					    }
					}
				}
			}
		}
	}


	genHill(1);
	// console.log(array);
	return array;
}

var World = Array3d(16,16,9);

//newArray = GenerateWorld(newArray);

