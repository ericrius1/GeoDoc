var Main = function() {

	var init = function(){


	}
	var locationData;
	var xhr;
	var newDataCurrentIndex = 0;
	var newItemsPerRequest = 3; //3 = 1 new item!
	var world;

	var updateInterval = 5000;

	var newData;

	xhr = new XMLHttpRequest();
	xhr.open('GET', 'assets/newLocData.json', true);
	xhr.onreadystatechange = function(e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
			   locationData = JSON.parse(xhr.responseText);
				world = new World(locationData);
				world.init();
				world.setUpEmitters();
				setUpAudio();
			}
		}
	};
	xhr.send(null);


	var getUpdatedData = function() {
		//ok we're getting new data... now update globe with it and then increment so next time we get new points
		var tempData = locationData.slice(newDataCurrentIndex, newDataCurrentIndex + newItemsPerRequest);
		world.updateData(tempData);
		newDataCurrentIndex += newItemsPerRequest;

	}
	setInterval(getUpdatedData, updateInterval);


	function increaseNumUsers(data) {
		for (var i = 0; i < data.length; i += 3) {
			data[i + 2] = randomRange(1, 2000);
		}

		return data;
	}

	function setUpAudio(){
		var audioElement = document.createElement('audio');
		audioElement.setAttribute('src', 'assets/odyssey.mp3');
		//audioElement.play();
	}



}