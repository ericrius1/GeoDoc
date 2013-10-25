var Emitter = function(lat, lon, numUsers, locationsGroup, minUsers, maxUsers) {


  var emitter;
  var particlesPerSecond = 100;
  var lat = lat;
  var lon = lon;
  var color;
  var velocity = {};

  this.numUsers = numUsers;

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

    color = mapColor(numUsers);

    emitter = new ShaderParticleEmitter({
      position: new THREE.Vector3(xPos * surfFactor, yPos * surfFactor, zPos * surfFactor),
      accelerationSpread: new THREE.Vector3(.1, .1, .1),

      colorStart: color,
      colorStartSpread: new THREE.Vector3(.2, .2, .2),
      colorEnd: color,
      sizeStart: sizeStart,
      sizeEnd: sizeStart,

      opacityStart: 0.3,
      opacityMidde: 0.8,
      opacityEnd: 0.5,



      particlesPerSecond: particlesPerSecond
    });

    locationsGroup.addEmitter(emitter);

  }

  var update = function(newNumUsers) {
    numUsers = newNumUsers;
    var velMultiplier = map(numUsers, minUsers, maxUsers, 0, velMultFactor) * .05;
    velocity.x = xPos * velMultiplier;
    velocity.y = yPos * velMultiplier;
    velocity.z = zPos * velMultiplier;


    color = mapColor(numUsers);

    emitter.setOption('velocity', new THREE.Vector3(velocity.x, velocity.y, velocity.z));
    emitter.setOption('colorStart', color);
    emitter.setOption('colorEnd', color);
  }

  var mapColor = function(numUsers) {
    var c = new THREE.Color();
    // h,s,l ranges are in 0.0 - 1.0
    var h = map(numUsers, minUsers, maxUsers, 0, 1)

    c.setHSL(h, 0.5, 0.5);
    return c;
  }
  this.init = init;
  this.update = update;

}