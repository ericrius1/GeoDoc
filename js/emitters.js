var Emitters = function(scene) {
	var scene = scene;
	var emitters = [];
	var locationData;
	var count = 0;

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
		}

		scene.add(locationsGroup.mesh);

	}

	var tick = function(dt) {
		locationsGroup.tick(dt);
		count++;
		if(count % 100 === 0){
			for(var i = 0; i < emitters.length; i++){
				emitters[i].update();
			}

		}
	}

	this.init = init;
	this.tick = tick;

}