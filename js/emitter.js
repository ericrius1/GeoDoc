var Emitter = function(lat, lon, numUsers, locationsGroup) {


  var emitter;
  var particlesPerSecond = 20;
  var lat = lat;
  var lon = lon;
  var numUsers = randomRange(100, 1000)
  var color;

  var velMultiplier = numUsers / 1000;

  var surfFactor = 0.5;

  var xPos, yPos, zPos;

  var locationsGroup = locationsGroup;

  var rand = Math.random;

  // Create particle group and rootEmitter

  var init = function() {

    var phi = (90 - lat) * Math.PI / 180;
    var theta = (180 - lon) * Math.PI / 180;

    xPos = Math.sin(phi) * Math.cos(theta);
    yPos = Math.cos(phi);
    zPos = Math.sin(phi) * Math.sin(theta);
    color = mapColor(xPos);
    emitter = new ShaderParticleEmitter({
      position: new THREE.Vector3(xPos * surfFactor, yPos * surfFactor, zPos * surfFactor),


      velocity: new THREE.Vector3(xPos * velMultiplier, yPos * velMultiplier, zPos * velMultiplier),
      velocitySpread: new THREE.Vector3(.1, 0.1, .1),

      accelertion: new THREE.Vector3(1, 1, 1),


      colorStart: color,
      colorEnd: color,
      size: .1,
      sizeEnd: .01,

      opacityStart: 1,
      opacityEnd: 0,

      particlesPerSecond: particlesPerSecond
    });

    locationsGroup.addEmitter(emitter);


  }

  var tick = function(dt) {
    locationsGroup.tick(dt);
  }

  var mapColor = function(x) {
    var c = new THREE.Color();
    // h,s,l ranges are in 0.0 - 1.0
    var h = map(numUsers, 0, 1000, 1, 0)
    console.log(h)
    c.setHSL(h, .5, .5);
    return c;
  }
  this.init = init;
  this.tick = tick;

}