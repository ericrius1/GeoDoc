var Main = function() {
	var locationData;
	var xhr;

	xhr = new XMLHttpRequest();
	xhr2 = new XMLHttpRequest();
	xhr.open('GET', 'assets/locationData.json', true);
	xhr2.open('GET', 'assets/newLocData.json', true);
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
	xhr2.send(null);

	xhr2.onreadystatechange = function(e){
		if(xhr.readyState === 4) {
			if(xhr.status === 200){
				var newData = JSON.parse(xhr.responseText);
				world.updateData(newData);
			}
		}
	}



}