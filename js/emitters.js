var Emitters = function(scene) {
	var scene = scene;

	var emitters = [];

	var locationData = [];
	var count = 0;

	var minUsers = 1;
	var maxUsers = 2000;


	var locationGroups = [];
	var locationsGroup;
	var maxAge = 5;

	var lossFrequency = 0.0;
	var updateFrequency = 1.0;


	var updateData = function(newLocationData) {

		// pretend we've gotten new numUser info for previous locations. Some will be updated. Some will be lost
		for (var i = 0; i < emitters.length; i++) {

			var emitter = emitters[i];
			if(Math.random() < lossFrequency){
				emitter.disableMe();
			}
			else if(Math.random() < updateFrequency){
				var numUsers = emitter.numUsers;
				var newNumUsers = randomRange(Math.max(minUsers, numUsers - 500), Math.min(numUsers + 500, maxUsers));
				emitter.update(newNumUsers)
				
			}
		}


		//Return if there are no new locations
		console.log('newLocationData',newLocationData)
		if(newLocationData === null)return;
		locationsGroup = new ShaderParticleGroup({
			texture: THREE.ImageUtils.loadTexture('assets/Envelope.png'),
			maxAge: maxAge
		});

		locationGroups.push(locationsGroup);
		for (var i = 0; i < newLocationData.length; i += 3) {
			emitter = new Emitter(newLocationData[i], newLocationData[i + 1], newLocationData[i + 2], locationsGroup, minUsers, maxUsers)
			emitter.init();
			emitters.push(emitter);
		}

		//just adds new Data
		scene.add(locationsGroup.mesh)
	}

	var tick = function(dt) {
		for (var i = 0; i < locationGroups.length; i++) {
			locationGroups[i].tick(dt);
		}

	}

	this.tick = tick;
	this.updateData = updateData;

}