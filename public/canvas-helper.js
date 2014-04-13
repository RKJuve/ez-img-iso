for (i = 0; i < 100; i++) {
	var temp = document.createElement('canvas')
	temp.id = 'c' + i;
	temp.style['z-index'] = 100 - i;
	$('body').append(temp);
}