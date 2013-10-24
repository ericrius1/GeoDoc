var Emitter = function(scene) {


  var scene = scene;
  var cityGroup;
  var emitter;
  var maxAge = 2;
  var particlesPerSecond = 500;

  var cityGroup;

  // Create particle group and rootEmitter

  var init = function() {
    console.log('init')

    cityGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('../assets/smokeparticle.png'),
      maxAge: maxAge
    });



    emitter = new ShaderParticleEmitter({
      position: new THREE.Vector3(0, 0, 0),

      acceleration: new THREE.Vector3(0, 1, 0),
      accelerationSpread: new THREE.Vector3(.05, 0.01, .05),

      velocity: new THREE.Vector3(0, 1, 0),
      velocitySpread: new THREE.Vector3(.01, 0.075, .01),

      colorStart: new THREE.Color('white'),
      colorEnd: new THREE.Color('blue'),
      size: .1,
      sizeEnd: .2,

      particlesPerSecond: particlesPerSecond
    });

    cityGroup.addEmitter(emitter);
    scene.add(cityGroup.mesh);

  }

  var tick = function(dt) {
    cityGroup.tick(dt);
  }
  this.init = init;
  this.tick = tick;

}