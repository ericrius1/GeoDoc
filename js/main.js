var Main = function() {

	var locationData;
	var xhr;
	var newDataCurrentIndex = 0;
	var newItemsPerRequest = 6; //3 = 1 new item!
	var world;
	var song;

	var updateInterval = 300;
	var newLocationFreq = 1.0;
	var newLocationDampingFactor = 0.02;
	var lossFrequency = 0.002;

	var newData;

	setUpAudio();
	setTimeout(beginDisplay, 13000);

	xhr = new XMLHttpRequest();
	xhr.open('GET', 'assets/localLocData.json', true);
	xhr.onreadystatechange = function(e) {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
			   locationData = JSON.parse(xhr.responseText);
			   //Increase num users
			   	locationData = setNumUsers(locationData)
				world = new World(lossFrequency);
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
		//ok we're getting new data... now update globe with it and then increment so next time we get new points. sometimes
		var tempData = Math.random() < newLocationFreq ? locationData.slice(newDataCurrentIndex, newDataCurrentIndex + newItemsPerRequest) : null;
		world.updateData(tempData);
		//Never let rate of new locations get at or below loss of locations
		newLocationFreq = Math.max(lossFrequency + (lossFrequency/4), newLocationFreq-newLocationDampingFactor);
		newDataCurrentIndex += newItemsPerRequest;
	}


	function setNumUsers(data) {
		//hack for presentation for first one
		data[2] = 2000;
		for (var i = 3; i < data.length; i += 3) {
			data[i + 2] = randomRange(1, 2000);
		}

		return data;
	}

	function setUpAudio(){
		song = document.createElement('audio');
		song.setAttribute('src', 'assets/odyssey.mp3');
		song.play();

	}



}