var objects = [
  {
    id:1,
    name: "Earth",
    lecture: "Earth lecture",
    position: {x:0, y:0, z:0},
    r:10,
    texture: "/client/pictures/earth_texture.jpg"
  },
  {
    id:2,
    name: "Pluto",
    lecture: "Pluto lecture",
    position: {x:20, y:0, z:0},
    r:3,
    texture: "/client/pictures/pluto_texture.jpg"
  }
]

var systems = [
  {
    id:1,
    name: "Solar System",
    lecture: "Solar System lecture",
    position: {x:0, y:0, z:0},
    elements: [ 1, 2 ]
  }
]

var texloader = new THREE.TextureLoader()

function loadDocument(){

}

function loadAstralObject(id){
  return objects.find(function(o){
    return o.id == id;
  })
}

function loadAstralSystem(id){
  return systems.find(function(s){
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

$(document).ready(function () {


var domElem = document.getElementById("WebGL-output");
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45
  , window.innerWidth / window.innerHeight , 0.1, 1000);
var renderer = new THREE.WebGLRenderer({
  canvas: domElem,
  precision:"highp",
  alpha: true
});
//renderer.setClearColor(0xEEEEEE);
renderer.setSize(window.innerWidth, window.innerHeight);

var spheres = objects.map(function(object){
  var sphereGeometry = new THREE.SphereGeometry(object.r, 32, 32)
  var sphereMaterial = new THREE.MeshPhongMaterial();
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = object.position.x;
  sphere.position.y = object.position.y;
  sphere.position.z = object.position.z;
  sphere.rotation.y += 0.02;
  scene.add(sphere);
  return sphere;
})

var spheresMaterials = spheres.map(function(s){
  return s.material;
})

loadManyTextures(spheresMaterials, AtomObjects, render)

var controls = new THREE.OrbitControls (camera, domElem)
controls.mouseButtons = {
  ORBIT: THREE.MOUSE.RIGHT,
  ZOOM: THREE.MOUSE.MIDDLE,
  PAN: THREE.MOUSE.LEFT };

camera.position.x = 30;
camera.position.y = 40;
camera.position.z = 30;
//camera.lookAt(scene.position);

var spotLight1 = new THREE.SpotLight( 0xffffff );
spotLight1.position.set( -40, 60, -10 );
scene.add(spotLight1);

var spotLight2 = new THREE.SpotLight( 0xffffff );
spotLight2.position.set( 40, 60, 10 );
scene.add(spotLight2);

function render() {
  requestAnimationFrame(render);
  controls.update(1)
  renderer.render(scene, camera);
}
});
