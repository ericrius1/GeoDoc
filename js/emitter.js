var Emitter = function(lat, lon, numUsers, locationsGroup) {


  var emitter;
  var particlesPerSecond = 10;
  var lat = lat;
  var lon = lon;
  var numUsers = randomRange(100, 1000);
  var color;
  var size = 0.013;
  var velocity = {};

  var phi = (90 - lat) * Math.PI / 180;
  var theta = (180 - lon) * Math.PI / 180;

  var xPos = Math.sin(phi) * Math.cos(theta);
  var yPos = Math.cos(phi);
  var zPos = Math.sin(phi) * Math.sin(theta);

  var velMultiplier = map(numUsers, 0, 1000, 1, 10) * .05;
  velocity.x = xPos * velMultiplier;
  velocity.y = yPos * velMultiplier;
  velocity.z = zPos * velMultiplier;

  var surfFactor = 0.5;


  var locationsGroup = locationsGroup;

  var rand = Math.random;

  // Create particle group and rootEmitter

  var init = function() {

    color = mapColor(xPos);

    emitter = new ShaderParticleEmitter({
      position: new THREE.Vector3(xPos * surfFactor, yPos * surfFactor, zPos * surfFactor),

      velocity: new THREE.Vector3(velocity.x, velocity.y, velocity.z),


      accelerationSpread: new THREE.Vector3(.02, 0.01, .02),


      colorStart: color,
      colorEnd: color,
      size: size,
      sizeEnd: size * 0.5,

      opacityStart: 1,
      opacityend: .4,

      particlesPerSecond: particlesPerSecond
    });

    locationsGroup.addEmitter(emitter);

  }

  var update = function() {

    // xPos+=10;
    // emitter.setOption('position', new THREE.Vector3(xPos, yPos, zPos));
  }

  var mapColor = function() {
    var c = new THREE.Color();
    // h,s,l ranges are in 0.0 - 1.0
    var h = map(numUsers, 100, 1000, 1, 0)
    c.setHSL(h, .5, .5);
    return c;
  }
  this.init = init;
  this.update = update;

}