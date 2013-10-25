


var Main = function() {
	var locationData;
	var xhr;
	var newDataCurrentIndex = 0;
	var newItemsPerRequest = 6;
	var world;

	var updateInterval = 5000;

	var newData;

	xhr = new XMLHttpRequest();
	xhr2 = new XMLHttpRequest();
	xhr.open('GET', 'assets/locationData.json', true);
	xhr2.open('GET', 'assets/newLocData.json', true);
	xhr.onreadystatechange = function(e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var locationData = JSON.parse(xhr.responseText);
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
    setInterval(getUpdatedData, updateInterval);

	xhr2.onreadystatechange = function(e){
		if(xhr2.readyState === 4) {
			if(xhr2.status === 200){
				newData = increaseNumUsers(JSON.parse(xhr2.responseText));
				
			}
		}
	}

	function increaseNumUsers(data){
		for(var i = 0; i < data.length; i+=3 ){
			data[i+2] = randomRange(1, 2000);
		}

		return data;
	}



}