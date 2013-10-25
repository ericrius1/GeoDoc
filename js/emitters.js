var Emitters = function(scene) {
	var scene = scene;

	var emitter;
	var emitters = [];

	var locationData = [];
	var count = 0;

	var minUsers = 1;
	var maxUsers = 2000;


	var locationGroups = [];
	var locationsGroup;
	var maxAge = 1.3;


	var updateData = function(newLocationData) {
		//We can get new locations as well as new numUser information for previous locations
		locationsGroup = new ShaderParticleGroup({
			texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
			maxAge: maxAge
		});

		locationGroups.push(locationsGroup);
		for (var i = 0; i < newLocationData.length; i += 3) {
			emitter = new Emitter(newLocationData[i], newLocationData[i + 1], newLocationData[i+2], locationsGroup, minUsers, maxUsers)
			emitter.init();
			emitters.push(emitter);
		}

		//now pretend we've gotten new numUser info for previous locations
		for(var i = 0; i < emitters.length; i++){
			var emitter = emitters[i];
			var numUsers = emitter.numUsers;
			var newNumUsers  = randomRange(Math.max( minUsers, numUsers - 500), Math.min(numUsers + 500, maxUsers));
			emitter.update(newNumUsers)
		}

		//just adds new Data
		scene.add(locationsGroup.mesh)
	}

	var tick = function(dt) {
		for(var i = 0; i < locationGroups.length; i++){
			locationGroups[i].tick(dt);
		}

	}

	this.tick = tick;
	this.updateData = updateData; 

}