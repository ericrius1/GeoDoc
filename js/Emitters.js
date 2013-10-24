var Emitters = function(scene) {


  var scene = scene;
  var cityGroup;
  var rootEmitter;

  var increment = 2;
  var radius = .3;
  var size = 10;
  var maxAge = 4;
  var pps = 2000;
  var opacityStart = 0.05;
  var opacityMiddle = 0.1;
  var opacityEnd = 0.05;
  var cityGroup;

  // Create particle group and rootEmitter

  var init = function() {
    console.log('init')

    cityGroup = new ShaderParticleGroup({
      texture: THREE.ImageUtils.loadTexture('../assets/smokeparticle.png'),
      maxAge: maxAge
    });



    //****ROOOOT******
    rootEmitter = new ShaderParticleEmitter({
      type: 'sphere',
      position: new THREE.Vector3(0,0, 0),

      radius: radius,
      speed: 2,

      colorStart: new THREE.Color('red'),
      colorSpread: new THREE.Vector3(0, 0.5, 0),
      colorEnd: new THREE.Color('red'),
      size: 1,
      sizeEnd: 0,

      opacityStart: opacityStart,
      opacityMiddle: opacityMiddle,
      opacityEnd: opacityEnd,

      particlesPerSecond: pps
    });


    cityGroup.addEmitter(rootEmitter);
    scene.add(cityGroup.mesh);

  }

  var tick = function(dt) {
    cityGroup.tick(dt);
  }
  this.init = init;
  this.tick = tick;

}