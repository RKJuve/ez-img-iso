for (i = 0; i < 101; i++) {
	var temp = document.createElement('canvas')
	temp.id = 'c' + i;
	temp.style['z-index'] = i;
	$('body').append(temp);
}