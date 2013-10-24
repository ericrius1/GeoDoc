var Emitters = function(locationData, scene){

	var scene = scene;
	var locationData = locationData;
	var emitters = [];

	var init = function(){
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