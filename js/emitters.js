var Emitters = function(scene) {
	var scene = scene;
	var emitters = [];
	var locationData = [];
	var count = 0;

	var minUsers = 1;
	var maxUsers = 40000;
	var emitter;


	var locationGroups;
	var locationsGroup;
	var maxAge = 1;


	var add = function(newLocationData) {
		locationsGroup  && scene.remove(locationsGroup.mesh)
		console.log(newLocationData)
		locationData = locationData.concat(newLocationData)
		console.log(locationData)
		locationsGroup = new ShaderParticleGroup({
			texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
			maxAge: maxAge
		});
		for (var i = 0; i < locationData.length; i += 3) {
			emitter = new Emitter(locationData[i], locationData[i + 1], randomRange(minUsers, maxUsers), locationsGroup, minUsers, maxUsers)
			emitter.init();
			emitters.push(emitter);
		}

		scene.add(locationsGroup.mesh)
	}

	var tick = function(dt) {
		locationsGroup.tick(dt);
		count++;
		// if (count % 100 === 0) {
		// 	for (var i = 0; i < emitters.length; i++) {
		// 		emitters[i].update(randomRange(minUsers, maxUsers));
		// 	}

		// }
	}

	this.tick = tick;
	this.add = add; 

}