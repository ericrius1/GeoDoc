var Emitters = function(scene) {


  var scene = scene;
  var cityGroup;
  var emitter;
  var maxAge = 2;

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
      accelerationSpread: new THREE.Vector3(.1, 0, .1),

      velocity: new THREE.Vector3(0, 1, 0),
      velocitySpread: new THREE.Vector3(.1, 0.075, .1),

      colorStart: new THREE.Color('white'),
      colorEnd: new THREE.Color('blue'),
      size: .1,
      sizeEnd: .2,

      particlesPerSecond: 1000
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