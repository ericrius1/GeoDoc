var Emitter = function(lat, lon, numUsers, locationsGroup) {


  var emitter;
  var maxAge = 2;
  var particlesPerSecond = 100;
  var lat = lat;
  var lon = lon;
  var numUsers = numUsers;


  var xPos, yPos, zPos;

  var locationsGroup = locationsGroup;

  // Create particle group and rootEmitter

  var init = function() {

  


    var phi = (90 - lat) * Math.PI / 180;
    var theta = (180 - lon) * Math.PI / 180;

    xPos =  Math.sin(phi) * Math.cos(theta);
    yPos =  Math.cos(phi);
    zPos =  Math.sin(phi) * Math.sin(theta);


    emitter = new ShaderParticleEmitter({
      position: new THREE.Vector3(xPos/10, yPos/10, zPos/10),

      acceleration: new THREE.Vector3(0, 0, 0),
      accelerationSpread: new THREE.Vector3(.05, 0.01, .05),

      velocity: new THREE.Vector3(xPos, yPos, zPos),
      velocitySpread: new THREE.Vector3(.01, 0.075, .01),

      colorStart: new THREE.Color('white'),
      colorEnd: new THREE.Color('blue'),
      size: .1,
      sizeEnd: .2,

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