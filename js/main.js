var Main = function() {

	var locationData;
	var xhr;
	var newDataCurrentIndex = 0;
	var newItemsPerRequest = 3; //3 = 1 new item!
	var world;
	var song;

	var updateInterval = 1000;

	var newData;

	setUpAudio();
	setTimeout(beginDisplay, 500);

	xhr = new XMLHttpRequest();
	xhr.open('GET', 'assets/newLocData.json', true);
	xhr.onreadystatechange = function(e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
			   locationData = JSON.parse(xhr.responseText);
			   //Increase num users
			   	locationData = setNumUsers(locationData)
				world = new World(locationData);
				world.init();
				world.setUpEmitters();
			}
		}
	};
	xhr.send(null);

	function beginDisplay(){
		getUpdatedData();
		setInterval(getUpdatedData, updateInterval);
	}


	var getUpdatedData = function() {
		//ok we're getting new data... now update globe with it and then increment so next time we get new points
		var tempData = locationData.slice(newDataCurrentIndex, newDataCurrentIndex + newItemsPerRequest);
		world.updateData(tempData);
		newDataCurrentIndex += newItemsPerRequest;

	}


	function setNumUsers(data) {
		for (var i = 0; i < data.length; i += 3) {
			data[i + 2] = randomRange(1, 2000);
		}

		return data;
	}

	function setUpAudio(){
		song = document.createElement('audio');
		song.setAttribute('src', 'assets/odyssey.mp3');
		//song.play();

	}



}