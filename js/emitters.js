var Emitters = function(scene) {
	var scene = scene;
	var emitters = [];
	var locationData;
	var count = 0;

	var minUsers = 1;
	var maxUsers = 40000;

	var locationsGroup;

	var maxAge = 1;

	var init = function(locationData) {

		locationsGroup = new ShaderParticleGroup({
			texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
			maxAge: maxAge
		});
		add(locationData);
		scene.add(locationsGroup.mesh);

	}

	var add = function(locationData) {
		for (var i = 0; i < locationData.length; i += 3) {
			var emitter = new Emitter(locationData[i], locationData[i + 1], randomRange(minUsers, maxUsers), locationsGroup, minUsers, maxUsers)
			emitters.push(emitter);
			emitter.init();
		}
	}

	var tick = function(dt) {
		locationsGroup.tick(dt);
		count++;
		if (count % 100 === 0) {
			for (var i = 0; i < emitters.length; i++) {
				emitters[i].update(randomRange(minUsers, maxUsers));
			}

		}
	}

	this.init = init;
	this.tick = tick;
	this.add = add;

}