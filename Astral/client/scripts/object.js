var SIZE = 8/12;
var CONTROLS;
var FOCUS_DISTANCE_COEFF = 5;

/*
var _objects = [
  {
    id:1,
    name: "Earth",
    lecture: "Earth lecture",
    position: {x:-30, y:0, z:0},
    lookAtPosition: {x:-20, y:20, z:40},
    r:10,
    rotV: 0.003,
    texture: "/client/pictures/earth_texture.jpg"
  },
  {
    id:2,
    name: "Pluto",
    lecture: "Pluto lecture",
    position: {x:35, y:0, z:30},
    lookAtPosition: {x:16, y:4, z:24},
    r:3,
    rotV: 0.015,
    texture: "/client/pictures/pluto_texture.jpg"
  }
]

var system = [
  {
    id:1,
    name: "Solar System",
    lookAtPosition: {x:0, y:20, z:130},
    elements: [ 1, 2 ]
  }
]
*/


function loadAstralObject(id){
  var res;
  $.ajax({
    async: false,
		type: "GET",
		url: '/loadobject/' + id,
		success:function(r) {
			console.log("loaded object " + id)
      res = r;
		}
	});
  return res;
}

function loadAstralSystem(id){
  var res;
  $.ajax({
    async: false,
		type: "GET",
		url: '/loadsystem/' + id,
		success:function(r) {
      res = r;
		}
	});
  return res;
}

function loadManyTextures(spheres, render, texloader){
  if(spheres.length == 0) {
    render();
    return;
  }
  var sphere = spheres.pop();
  texloader.load(
    sphere.AstralObject.texture,
    function(texture){
      sphere.material.map = texture
      loadManyTextures(spheres, render, texloader)
    },
    function(res){},
    function(res){}
  );
}

function showMyPosition(pos){
  var prec = 4
  $("#positionLabel").html(
    pos.x.toPrecision(prec)
    + " " + pos.y.toPrecision(prec)
    + " " + pos.z.toPrecision(prec)
  )
}

function loadSetupSystem(){
  var SystemId = window.location.pathname.split('/').pop()
  var system = loadAstralSystem(SystemId);
  if(system === undefined){
    console.log("cant find system " + SystemId)
    return
  }

  var objects = system.elements.map(function(id){
    return loadAstralObject(id);
  })

  return objects;
}

function loadSpheresOnScene(scene, camera){
  var objects = loadSetupSystem();
  var spheres = objects.map(function(object){
    var sphereGeometry = new THREE.SphereGeometry(object.r, 32, 32)
    var sphereMaterial = new THREE.MeshLambertMaterial();
    if(object.isLightSource == true){
      surroundAstralObjectWithLights(object, scene, 0xffffff, 0.5, 0)      
    }

    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = object.position.x;
    sphere.position.y = object.position.y;
    sphere.position.z = object.position.z;
    scene.add(sphere);
    sphere.AstralObject = object;



    return sphere;
  })
  camera.position.x = scene.position.x;
  camera.position.y = scene.position.y;
  camera.position.z = scene.position.z + 500;
  return spheres;
}

function surroundAstralObjectWithLights(object, scene, color, intensity, distance){
  var d = object.r + (2 * object.r);
  var light1 = new THREE.PointLight(color, intensity, distance);
  light1.position.set(object.position.x + d, object.position.y, object.position.z + d);
  scene.add(light1);
  var light2 = new THREE.PointLight(color, intensity, distance);
  light2.position.set(object.position.x - d, object.position.y, object.position.z + d);
  scene.add(light2);
  var light3 = new THREE.PointLight(color, intensity, distance);
  light3.position.set(object.position.x + d, object.position.y, object.position.z - d);
  scene.add(light3);
  var light4 = new THREE.PointLight(color, intensity, distance);
  light4.position.set(object.position.x - d, object.position.y, object.position.z - d);
  scene.add(light4);
  var light5 = new THREE.PointLight(color, intensity, distance);
  light5.position.set(object.position.x, object.position.y + d, object.position.z);
  scene.add(light5);
  var light6 = new THREE.PointLight(color, intensity, distance);
  light6.position.set(object.position.x, object.position.y - d, object.position.z);
  scene.add(light6);
}

function showLightsOnScene(scene){
  var spotLight1 = new THREE.SpotLight( 0xffffff );
  spotLight1.position.set( -40, 60, -10 );
  //scene.add(spotLight1);

  var HemisphereLight = new THREE.AmbientLight( 0xffffff, 0.4);
  scene.add(HemisphereLight);
}

function setupMouseSelector(scene, camera){
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  function onMouseMove( event ) {
  	mouse.x = ( event.clientX / (window.innerWidth * SIZE) ) * 2 - 1;
  	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );
    scene.traverse(function(node) {
      if (node instanceof THREE.Mesh) {
        node.material.color.set( 0xffffff );
        $("#objectNameLabel").html("")
      }
    });
    for (var i = 0; i < intersects.length; i++) {
      var sphere = intersects[i].object;
      sphere.material.color.set( 0xffff00 );
      $("#objectNameLabel").html(sphere.AstralObject.name)
    }

  }

  function onMouseDown( event ) {
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );
    var selected_object = intersects.find(function(){return true;})
    if(selected_object !== undefined){
      selectObject(selected_object.object.AstralObject.id)
    }
  }
  window.addEventListener( 'mousemove', onMouseMove, false );
  window.addEventListener( 'mousedown', onMouseDown, false );

}

function selectObject(id){
  var object = loadAstralObject(id);
  lookAtObject(object, 100);
  loadLecture(object);
}

function loadLecture(object){
  $("#object_name").html(object.name);
  $("#object_text").html(object.lecture);
}

function lookAtObject(object, delay){
  setTimeout(function(){
    CONTROLS.object.position.x = object.position.x;
    CONTROLS.object.position.y = object.position.y;
    CONTROLS.object.position.z = object.position.z + (object.r * FOCUS_DISTANCE_COEFF);
    CONTROLS.target.set(
      object.position.x,
      object.position.y,
      object.position.z)
  }, delay)
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
    return false;
}

function lookAt(camera, targetPosition) {
    var targetPos = camera.worldToLocal(targetPosition.clone());
    var rotationAxis = new THREE.Vector3().crossVectors(
        new THREE.Vector3(0, 0, -1),
        targetPos
    ).normalize();
    var angle = new THREE.Vector3(0, 0, -1).angleTo(
        targetPos.normalize().clone());

    camera.rotateOnAxis(rotationAxis, angle);
}

function setupControls(camera, domElem){
  CONTROLS = new THREE.OrbitControls (camera, domElem)
  CONTROLS.mouseButtons = {
    ORBIT: THREE.MOUSE.RIGHT,
    ZOOM: THREE.MOUSE.MIDDLE,
    PAN: THREE.MOUSE.LEFT };
}

function rotateSpheres(spheres){
  spheres.map(function(s){
    s.rotation.y += s.AstralObject.rotV;
  })
}

function rotateSpheresOrbits(spheres){
  spheres.map(function(s){
    s.position.x = s.AstralObject.orbit.center.x
      + (s.position.x - s.AstralObject.orbit.center.x)*Math.cos(s.AstralObject.orbit.angleV)
      - (s.position.z - s.AstralObject.orbit.center.z)*Math.sin(s.AstralObject.orbit.angleV);
    s.position.z = s.AstralObject.orbit.center.z
      + (s.position.x-s.AstralObject.orbit.center.x)*Math.sin(s.AstralObject.orbit.angleV)
      + (s.position.z-s.AstralObject.orbit.center.z)*Math.cos(s.AstralObject.orbit.angleV);
  })
}

function setupObjectsList(objects){
  for(i=0;i<objects.length;i++){
    var object = objects[i];
    var objectName = object.name;
    var objectId = object.id;
    $("#objectsList").append(
      "<li><a onclick=\"selectObject("
      + objectId
      + ")\">"
      + objectName
      + "</a></li>"
    )
  }
}

$(document).ready(function () {
  //Setting up variables
  var domElem = document.getElementById("WebGL-output");
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45
    , window.innerWidth * SIZE / window.innerHeight , 0.1, 1000);
  camera.lookAt(scene.position);
  var renderer = new THREE.WebGLRenderer({
    canvas: domElem,
    precision:"highp",
    alpha: true
  });
  //renderer.setClearColor(0xEEEEEE);
  renderer.setSize(window.innerWidth * SIZE, window.innerHeight);
  var texloader = new THREE.TextureLoader()

  //Main functions calls
  setupControls(camera, domElem);
  setupMouseSelector(scene, camera);
  var spheres = loadSpheresOnScene(scene, camera);
  loadManyTextures(spheres.slice(), render, texloader)
  showLightsOnScene(scene);
  setupObjectsList(spheres.slice().map(function(s){ return s.AstralObject; }))

  //Our loop
  function render() {
    requestAnimationFrame(render);
    CONTROLS.update(1)
    showMyPosition(camera.position)
    rotateSpheres(spheres)
    rotateSpheresOrbits(spheres)
    renderer.render(scene, camera);
  }
});
