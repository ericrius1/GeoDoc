var Emitters = function(scene) {
	var scene = scene;
	var emitters = [];
	var locationData = [];
	var count = 0;

	var minUsers = 1;
	var maxUsers = 40000;
	var emitter;


	var locationGroups = [];
	var locationsGroup;
	var maxAge = 1;


	var add = function(newLocationData) {
		locationsGroup = new ShaderParticleGroup({
			texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
			maxAge: maxAge
		});

		locationGroups.push(locationsGroup);
		for (var i = 0; i < newLocationData.length; i += 3) {
			emitter = new Emitter(newLocationData[i], newLocationData[i + 1], randomRange(minUsers, maxUsers), locationsGroup, minUsers, maxUsers)
			emitter.init();
			emitters.push(emitter);
		}

		//just adds new Data
		scene.add(locationsGroup.mesh)
	}

	var tick = function(dt) {
		for(var i = 0; i < locationGroups.length; i++){
			locationGroups[i].tick(dt);
		}
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