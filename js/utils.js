var randomRange = function(min, max) {

	return Math.random() * (max - min) + min;
}

var map = function(value, min1, max1, min2, max2) {
	return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}