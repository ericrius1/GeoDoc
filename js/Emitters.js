var Emitters = function(scene) {
	var scene = scene;
	var emitters = [];
	var locationData;

	var init = function(locationData) {
		locationData = locationData;
		for (var i = 0; i < locationData.length/100; i += 2) {
			var emitter = new Emitter(scene, locationData[i], locationData[i+1], locationData[i+2])
			emitters.push(emitter);
			emitter.init();

		}

	}

	var tick = function(dt) {
		for (var i = 0; i < emitters.length; i++) {
			emitters[i].tick(dt)
		}

	}

	this.init = init;
	this.tick = tick;

}