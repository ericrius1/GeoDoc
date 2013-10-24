var Emitters = function(scene) {
	var scene = scene;
	var emitters = [];
	var locationData;

	var locationsGroup;

	var maxAge = 2;

	var init = function(locationData) {

		locationsGroup = new ShaderParticleGroup({
			texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
			maxAge: maxAge
		});
		locationData = locationData;
		for (var i = 0; i < locationData.length; i += 2) {
			var emitter = new Emitter(locationData[i], locationData[i + 1], locationData[i + 2], locationsGroup)
			emitters.push(emitter);
			emitter.init();
			//yo

		}

		scene.add(locationsGroup.mesh);

	}

	var tick = function(dt) {
		for (var i = 0; i < emitters.length; i++) {
			emitters[i].tick(dt)
		}

	}

	this.init = init;
	this.tick = tick;

}