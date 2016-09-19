var objects = [
  {
    x:0, y:0, z:0, r:2,
    texture: "/client/pictures/texture.jpg"
  },
  {
    x:15, y:15, z:15, r:15,
    texture: "/client/pictures/texture.jpg"
  },
]

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
var texloader = new THREE.TextureLoader()

objects.map(function(object){
  var sphereGeometry = new THREE.SphereGeometry(object.r, 32, 32)
  var sphereMaterial = new THREE.MeshPhongMaterial();
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = object.x;
  sphere.position.y = object.y;
  sphere.position.z = object.z;
  scene.add(sphere);
  texloader.load(
    object.texture,
    function(texture){
      sphereMaterial.map = texture
    },
    function(res){},
    function(res){}
  );
})


var controls = new THREE.OrbitControls (camera, domElem)
controls.mouseButtons = {
  ORBIT: THREE.MOUSE.RIGHT,
  ZOOM: THREE.MOUSE.MIDDLE,
  PAN: THREE.MOUSE.LEFT };

camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

var spotLight1 = new THREE.SpotLight( 0xffffff );
spotLight1.position.set( -40, 60, -10 );
scene.add(spotLight1);

var spotLight2 = new THREE.SpotLight( 0xffffff );
spotLight2.position.set( 40, 60, 10 );
scene.add(spotLight2);


render();



function render() {
  //sphere.rotation.x += 0.02;
  sphere.rotation.y += 0.02;
  requestAnimationFrame(render);
  controls.update(1)
  renderer.render(scene, camera);
}
});
