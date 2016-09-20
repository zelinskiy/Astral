var SIZE = 8/12;

var _objects = [
  {
    id:1,
    name: "Earth",
    lecture: "Earth lecture",
    position: {x:-50, y:0, z:0},
    lookAtPosition: {x:-20, y:20, z:40},
    r:10,
    texture: "/client/pictures/earth_texture.jpg"
  },
  {
    id:2,
    name: "Pluto",
    lecture: "Pluto lecture",
    position: {x:35, y:0, z:30},
    lookAtPosition: {x:16, y:4, z:24},
    r:3,
    texture: "/client/pictures/pluto_texture.jpg"
  }
]

var _systems = [
  {
    id:1,
    name: "Solar System",
    lookAtPosition: {x:0, y:20, z:130},
    elements: [ 1, 2 ]
  }
]

var texloader = new THREE.TextureLoader()

function loadAstralObject(id){
  return _objects.find(function(o){
    return o.id == id;
  })
}

function loadAstralSystem(id){
  return _systems.find(function(s){
    return s.id == id;
  })
}

function loadManyTextures(materials, urls, render){
  if(materials.length == 0) {
    render();
    return;
  }

  texloader.load(
    urls.pop(),
    function(texture){
      materials.pop().map = texture
      loadManyTextures(materials, urls, render)
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



$(document).ready(function () {

var SystemId = getQueryVariable("system_id")
var system = loadAstralSystem(SystemId);
if(system === undefined){
  console.log("cant find system")
  return
}


var objects = system.elements.map(function(id){
  return loadAstralObject(id);
})

var domElem = document.getElementById("WebGL-output");
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45
  , window.innerWidth * SIZE / window.innerHeight , 0.1, 1000);
var renderer = new THREE.WebGLRenderer({
  canvas: domElem,
  precision:"highp",
  alpha: true
});
//renderer.setClearColor(0xEEEEEE);
renderer.setSize(window.innerWidth * SIZE, window.innerHeight);

var spheres = objects.map(function(object){
  var sphereGeometry = new THREE.SphereGeometry(object.r, 32, 32)
  var sphereMaterial = new THREE.MeshPhongMaterial();
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = object.position.x;
  sphere.position.y = object.position.y;
  sphere.position.z = object.position.z;
  sphere.rotation.y += 0.02;
  scene.add(sphere);
  sphere.AstralObject = object;
  return sphere;
})

var spheresMaterials = spheres.map(function(s){
  return s.material;
})

var objectsTextures = objects.map(function(o){
  return o.texture;
})


var controls = new THREE.OrbitControls (camera, domElem)
controls.mouseButtons = {
  ORBIT: THREE.MOUSE.RIGHT,
  ZOOM: THREE.MOUSE.MIDDLE,
  PAN: THREE.MOUSE.LEFT };


camera.position.x = system.lookAtPosition.x;
camera.position.y = system.lookAtPosition.y;
camera.position.z = system.lookAtPosition.z;
camera.lookAt(scene.position);

var spotLight1 = new THREE.SpotLight( 0xffffff );
spotLight1.position.set( -40, 60, -10 );
scene.add(spotLight1);

var spotLight2 = new THREE.SpotLight( 0xffffff );
spotLight2.position.set( 40, 60, 10 );
scene.add(spotLight2);




loadManyTextures(spheresMaterials, objectsTextures, render)

//lookAtObject(controls, loadAstralObject(2), 1000)
lookAtObject(loadAstralObject(1), 500)

/**********************************************************/
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
window.addEventListener( 'mousemove', onMouseMove, false );
/**********************************************************/


function render() {
  requestAnimationFrame(render);
  controls.update(1)
  showMyPosition(camera.position)
  processMouseIntersects()
  renderer.render(scene, camera);
}

function processMouseIntersects(){
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( scene.children );
  scene.traverse(function(node) {
    if (node instanceof THREE.Mesh) {
      node.material.color.set( 0xffffff );
      $("#objectNameLabel").html("")
    }
  });
	for (var i = 0; i < intersects.length; i++) {
		intersects[i].object.material.color.set( 0xffff00 );
    $("#objectNameLabel").html(intersects[i].object.AstralObject.name)
	}
}

function lookAtObject(object, delay){
  setTimeout(function(){
    controls.object.position.x = object.lookAtPosition.x;
    controls.object.position.y = object.lookAtPosition.y;
    controls.object.position.z = object.lookAtPosition.z;
    controls.target.set(
      object.position.x,
      object.position.y,
      object.position.z)
  }, delay)
}

});

function toVector3(pos){
  return new THREE.Vector3(pos.x, pos.y, pos.z)
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
