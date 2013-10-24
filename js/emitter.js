var Emitter = function(lat, lon, numUsers, locationsGroup) {


  var emitter;
  var particlesPerSecond = 10;
  var lat = lat;
  var lon = lon;
  var numUsers = numUsers;

  var velFactor = 3;


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
      position: new THREE.Vector3(xPos * 0.1, yPos * 0.1, zPos * 0.1),


      velocity: new THREE.Vector3(xPos/velFactor, yPos/velFactor, zPos/velFactor),
      velocitySpread: new THREE.Vector3(.01, 0.01, .01),

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