var Main = function() {
	var locationData;
	var xhr;

	xhr = new XMLHttpRequest();
	xhr.open('GET', '/geodoc/assets/locationData.json', true);
	xhr.onreadystatechange = function(e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var data = JSON.parse(xhr.responseText);
				locationData = data;
				var world = new World(locationData);
				world.init();
				world.setUpEmitters();
			}
		}
	};
	xhr.send(null);



}