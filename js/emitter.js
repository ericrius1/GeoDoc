var Emitter = function(lat, lon, initialNumUsers, locationsGroup, minUsers, maxUsers) {

  this.numUsers = initialNumUsers;


  var myEmitter;
  var particlesPerSecond = 111;
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
  //Raise this to increase velocity ****************
  var velMultFactor = 40;
  var surfFactor = 0.5;
  var sizeStart = .07;


  var locationsGroup = locationsGroup;

  var rand = Math.random;

  // Create particle group and rootEmitter

  var init = function() {

    this.recalculate();

    myEmitter = new ShaderParticleEmitter({
      position: new THREE.Vector3(xPos * surfFactor, yPos * surfFactor, zPos * surfFactor),
      velocity: velocity,
      accelerationSpread: accelSpread,

      colorStart: currentColor,
      colorStartSpread: new THREE.Vector3(.1, .1, .1),
      colorEnd: currentColor,
      sizeStart: sizeStart,
      sizeEnd: sizeStart,
      particlesPerSecond: particlesPerSecond,

      opacityStart: 1.0,
      opacityEnd: 0.4

    });

    locationsGroup.addEmitter(myEmitter);

    //dispals right away
    myEmitter.setOption('velocity', new THREE.Vector3(velocity.x, velocity.y, velocity.z));
    myEmitter.setOption('accelerationSpread', new THREE.Vector3(accelSpread.x, accelSpread.y, accelSpread.z));
    myEmitter.setOption('colorStart', currentColor);
    myEmitter.setOption('colorEnd', currentColor);

  }

  var update = function(newNumUsers) {
    this.numUsers = newNumUsers || this.numUsers;

    this.recalculate();

    myEmitter.setOption('velocity', new THREE.Vector3(velocity.x, velocity.y, velocity.z));
    myEmitter.setOption('accelerationSpread', new THREE.Vector3(accelSpread.x, accelSpread.y, accelSpread.z));
    myEmitter.setOption('colorStart', currentColor);
    myEmitter.setOption('colorEnd', currentColor);
  }

  this.recalculate = function() {
    this.mapColor(this.numUsers);

    var velMultiplier = map(this.numUsers, minUsers, maxUsers, 0, velMultFactor) * .011;
    velocity.x = xPos * velMultiplier;
    velocity.y = yPos * velMultiplier;
    velocity.z = zPos * velMultiplier;

    var accelFactor = map(this.numUsers, minUsers, maxUsers, 0, .009);
    accelSpread.x = accelFactor
    accelSpread.y = accelFactor
    accelSpread.z = accelFactor

  }

  this.mapColor = function() {
    // h,s,l ranges are in 0.0 - 1.0
    console.log(this.numUsers)
    var h = map(this.numUsers, minUsers, maxUsers, 1, 0)
    currentColor.setHSL(h, 0.5, 0.5);
  }

  var disableMe = function() {
    myEmitter.disable();
  }
  this.init = init;
  this.update = update;
  this.disableMe = disableMe;

}