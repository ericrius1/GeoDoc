var Emitters = function(scene){
	var scene = scene;
	var emitters = [];
	var locationData;

	var init = function(locationData){
	    locationData = locationData;
		emitters.push(new Emitter(scene));
		emitters[emitters.length-1].init()

	}

	var tick = function(dt){
		for(var i = 0; i < emitters.length; i++){
			emitters[i].tick(dt)
		}

	}

	this.init = init;
	this.tick = tick;

}