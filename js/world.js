var World = function() {
	var scene;

	var lossFrequency;
	var camPullback = 0.0002;

	var lon = 0,
		lat = 0,
		phi = 0,
		theta = 0;
	var myEmitters;
	var init = function() {

		var controls;

		var dt = 0.016;

		var renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
		renderer.shadowMapEnabled = true

		var onRenderFcts = [];
		scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10000);
		camera.position.z = 1.5;



		windowResize(renderer, camera);

		controls = new THREE.OrbitControls(camera);
		controls.autoRotate = true;
		controls.autoRotateSpeed = -0.77;


		setUpLights(scene);


		//////////////////////////////////////////////////////////////////////////////////
		//		added starfield							//
		//////////////////////////////////////////////////////////////////////////////////

		var geometry = new THREE.SphereGeometry(90, 32, 32)
		var material = new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture('bower_components/threex.planets/examples/images/galaxy_starfield.png'),
			side: THREE.BackSide
		})
		var starSphere = new THREE.Mesh(geometry, material)
		scene.add(starSphere)

		//////////////////////////////////////////////////////////////////////////////////
		//		add an object and make it move					//
		//////////////////////////////////////////////////////////////////////////////////

		// var datGUI	= new dat.GUI()

		var containerEarth = new THREE.Object3D()
		containerEarth.rotateZ(-23.4 * Math.PI / 180)
		containerEarth.position.z = 0
		scene.add(containerEarth)

		var earthMesh = THREEx.Planets.createEarth()
		earthMesh.receiveShadow = true
		earthMesh.castShadow = true
		containerEarth.add(earthMesh)

		var geometry = new THREE.SphereGeometry(0.5, 32, 32)
		var material = THREEx.createAtmosphereMaterial()
		material.uniforms.glowColor.value.set(0x00b3ff)
		material.uniforms.coeficient.value = 0.8
		material.uniforms.power.value = 2.0
		var mesh = new THREE.Mesh(geometry, material);
		mesh.scale.multiplyScalar(1.01);
		containerEarth.add(mesh);
		// new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)

		var geometry = new THREE.SphereGeometry(0.5, 32, 32)
		var material = THREEx.createAtmosphereMaterial()
		material.side = THREE.BackSide
		material.uniforms.glowColor.value.set(0x00b3ff)
		material.uniforms.coeficient.value = 0.5
		material.uniforms.power.value = 4.0
		var mesh = new THREE.Mesh(geometry, material);
		mesh.scale.multiplyScalar(1.15);
		containerEarth.add(mesh);

		var earthCloud = THREEx.Planets.createEarthCloud()
		earthCloud.receiveShadow = true
		earthCloud.castShadow = true
		containerEarth.add(earthCloud)
		onRenderFcts.push(function(delta, now) {
			earthCloud.rotation.y += 1 / 32 * delta;
		})



		//////////////////////////////////////////////////////////////////////////////////
		//		render the scene						//
		//////////////////////////////////////////////////////////////////////////////////
		onRenderFcts.push(function() {
			renderer.render(scene, camera);
			if(myEmitters){
				myEmitters.tick(dt)
			}
		})

		//////////////////////////////////////////////////////////////////////////////////
		//		loop runner							//
		//////////////////////////////////////////////////////////////////////////////////
		var lastTimeMsec = null
		requestAnimationFrame(function animate(nowMsec) {
			// keep looping
			requestAnimationFrame(animate);
			camera.position.z += camPullback;



			controls.update();
			// measure time
			lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
			var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
			lastTimeMsec = nowMsec
			// call each update function
			onRenderFcts.forEach(function(onRenderFct) {
				onRenderFct(deltaMsec / 1000, nowMsec / 1000)
			})
		})

	}


	var setUpEmitters = function() {
		myEmitters = new Emitters(scene, lossFrequency);
	}

	var updateData = function(newLocationData) {
		myEmitters.updateData(newLocationData);

	}

	var windowResize = function(renderer, camera) {
		var callback = function() {
			// notify the renderer of the size change
			renderer.setSize(window.innerWidth, window.innerHeight);
			// update the camera
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		}
		// bind the resize event
		window.addEventListener('resize', callback, false);
		// return .stop() the function to stop watching window resize
		return {
			/**
			 * Stop watching window resize
			 */
			stop: function() {
				window.removeEventListener('resize', callback);
			}
		};
	}
	function setUpLights(scene) {


		var light = new THREE.DirectionalLight(0xffffff, 1)
		light.position.set(10, 10, 10)
		scene.add(light)
		light.intensity = 1.5;
		light.castShadow = true
		light.shadowCameraNear = 0.01
		light.shadowCameraFar = 15
		light.shadowCameraFov = 45

		light.shadowCameraLeft = -1
		light.shadowCameraRight = 1
		light.shadowCameraTop = 1
		light.shadowCameraBottom = -1

		light.shadowBias = 0.001
		light.shadowDarkness = 0.2

		light.shadowMapWidth = 1024
		light.shadowMapHeight = 1024

		var light2 = new THREE.DirectionalLight(0xffffff, 1)
		light2.position.set(-10, -10, -10)
		scene.add(light2)
		light2.intensity = 1.5;
		light2.castShadow = true
		light2.shadowCameraNear = 0.01
		light2.shadowCameraFar = 15
		light2.shadowCameraFov = 45

		light2.shadowCameraLeft = -1
		light2.shadowCameraRight = 1
		light2.shadowCameraTop = 1
		light2.shadowCameraBottom = -1
		// light2.shadowCameraVisible	= true

		light2.shadowBias = 0.001
		light2.shadowDarkness = 0.2

		light2.shadowMapWidth = 1024
		light2.shadowMapHeight = 1024
	}

	this.init = init;
	this.setUpEmitters = setUpEmitters;
	this.updateData = updateData;

}