var Main = function() {
	var locationData;
	var xhr;
	var newDataCurrentIndex = 0;
	var newItemsPerRequest = 9;
	var world;

	var newData;

	xhr = new XMLHttpRequest();
	xhr2 = new XMLHttpRequest();
	xhr.open('GET', 'assets/locationData.json', true);
	xhr2.open('GET', 'assets/newLocData.json', true);
	xhr.onreadystatechange = function(e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var data = JSON.parse(xhr.responseText);
				locationData = data;
				world = new World(locationData);
				world.init();
				world.setUpEmitters();
			}
		}
	};
	xhr.send(null);
	xhr2.send(null);


	var getUpdatedData = function(){
		//ok we're getting new data... now update globe with it and then increment so next time we get new points
		var tempData = newData.slice(newDataCurrentIndex, newDataCurrentIndex + newItemsPerRequest);
		world.updateData(tempData);
		newDataCurrentIndex += newItemsPerRequest;

	}
    setInterval(getUpdatedData, 3000);

	xhr2.onreadystatechange = function(e){
		if(xhr2.readyState === 4) {
			if(xhr2.status === 200){
				newData = JSON.parse(xhr2.responseText);
				//newData = _.shuffle(newData);
			}
		}
	}



}