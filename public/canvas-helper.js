for (i = 0; i < 150; i++) {
	var temp = document.createElement('canvas')
	temp.id = 'c' + i;
	temp.style['z-index'] = i;
	$('#inner').append(temp);
}