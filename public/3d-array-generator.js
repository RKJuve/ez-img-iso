function make3dArray(z,y,x) {
	var temp = [];
	for (i = 0; i < z; i++) {
		temp.push([]);
	}
	for (i = 0; i < z; i++) {
		for (j = 0; j < y; j++) {
			temp[i].push([]);			
		}
 	}
 	for (i = 0; i < z; i++) {
		for (j = 0; j < y; j++) {
			for (k = 0; k < x; k++) {
				if ( 0.8*i + 0.8*j + 1*k < 17) {
					temp[i][j].push(1);
				} else {
					temp[i][j].push(0);
				}
			}			
		}
 	}
 	return temp;
}

var startTime = performance.now();
var newArray = make3dArray(9,16,16);
endTime = performance.now();
// console.log("done!! took %s seconds", ((endTime-startTime)/1000));
// console.log(newArray);

var temp = 0;

var startTime = performance.now();
for (i = 0; i < newArray.length; i++) {
		for (j = 0; j < newArray[0].length; j++) {
			for (k = 0; k < newArray[0][0].length; k++) {
				temp += newArray[i][j][k];
			}			
		}
 	}
 	
endTime = performance.now();
// console.log("done!! took %s seconds", ((endTime-startTime)/1000));
// console.log(temp);