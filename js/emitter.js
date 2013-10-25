var Emitter = function(lat, lon, initialNumUsers, locationsGroup, minUsers, maxUsers) {

  this.numUsers = initialNumUsers;


  var emitter;
  var particlesPerSecond = 100;
  var lat = lat;
  var lon = lon;
  var currentColor = new THREE.Color();

  var velocity = {};
  var accelSpread = {};

  var minUsers = minUsers;
  var maxUsers = maxUsers;

  var phi = (90 - lat) * Math.PI / 180;
  var theta = (180 - lon) * Math.PI / 180;

  var xPos = Math.sin(phi) * Math.cos(theta);
  var yPos = Math.cos(phi);
  var zPos = Math.sin(phi) * Math.sin(theta);

  var velMultiplier;
  //Raise this to increase velocity
  var velMultFactor = 20;
  var surfFactor = 0.5;
  var sizeStart = .1;


  var locationsGroup = locationsGroup;

  var rand = Math.random;

  // Create particle group and rootEmitter

  var init = function() {

    recalculate();

    emitter = new ShaderParticleEmitter({
      position: new THREE.Vector3(xPos * surfFactor, yPos * surfFactor, zPos * surfFactor),
      velocity: velocity,

      colorStart: currentColor,
      colorStartSpread: new THREE.Vector3(.2, .2, .2),
      colorEnd: currentColor,
      sizeStart: sizeStart,
      sizeEnd: sizeStart,
      particlesPerSecond: particlesPerSecond
    });

    locationsGroup.addEmitter(emitter);

  }

  var update = function(newNumUsers) {
    numUsers = newNumUsers;

    recalculate();

    emitter.setOption('velocity', new THREE.Vector3(velocity.x, velocity.y, velocity.z));
    emitter.setOption('accelerationSpread', new THREE.Vector3(accelSpread.x, accelSpread.y, accelSpread.z));
    emitter.setOption('colorStart', currentColor);
    emitter.setOption('colorEnd', currentColor);
  }

  var recalculate = function() {
    mapColor(this.numUsers);

    var velMultiplier = map(this.numUsers, minUsers, maxUsers, 0, velMultFactor) * .05;
    velocity.x = xPos * velMultiplier;
    velocity.y = yPos * velMultiplier;
    velocity.z = zPos * velMultiplier;

    var accelFactor = map(this.numUsers, minUsers, maxUsers, 0, .1);
    accelSpread.x = accelFactor
    accelSpread.y = accelFactor
    accelSpread.z = accelFactor

  }

  var mapColor = function(numUsers) {
    // h,s,l ranges are in 0.0 - 1.0
    var h = map(this.numUsers, minUsers, maxUsers, 0, 1)
    currentColor.setHSL(h, 0.5, 0.5);
  }
  this.init = init;
  this.update = update;

}