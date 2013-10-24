var Emitter = function(lat, lon, numUsers, locationsGroup) {


  var emitter;
  var particlesPerSecond = 20;
  var lat = lat;
  var lon = lon;
  var numUsers = 1000;

  var velMultiplier = numUsers/1000;

  var surfFactor = 0.5;

  var xPos, yPos, zPos;

  var locationsGroup = locationsGroup;

  var rand = Math.random;

  // Create particle group and rootEmitter

  var init = function() {

    var phi = (90 - lat) * Math.PI / 180;
    var theta = (180 - lon) * Math.PI / 180;

    xPos =  Math.sin(phi) * Math.cos(theta);
    yPos =  Math.cos(phi);
    zPos =  Math.sin(phi) * Math.sin(theta);

    emitter = new ShaderParticleEmitter({
      position: new THREE.Vector3(xPos * surfFactor, yPos * surfFactor, zPos * surfFactor),


      velocity: new THREE.Vector3(xPos * velMultiplier, yPos * velMultiplier, zPos * velMultiplier),
      velocitySpread: new THREE.Vector3(.1, 0.1, .1),

      accelertion: new THREE.Vector3(1,1,1),


      colorStart: new THREE.Color('white'),
      colorEnd: new THREE.Color('blue'),
      size: .3,
      sizeEnd: .1,

      opacityStart: 1,
      opacityEnd: 0,

      particlesPerSecond: particlesPerSecond
    });

    locationsGroup.addEmitter(emitter);


  }

  var tick = function(dt) {
    locationsGroup.tick(dt);
  }
  this.init = init;
  this.tick = tick;

}