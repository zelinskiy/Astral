var SIZE = 0.7;

var defaultObject = {
  description:"",
  isLightSource:false,
  lecture:"",
  name:"Planet Name",
  orbit:{"angleV":0.0,"center":{"x":0,"y":0,"z":0},"color":"#f0f0f0"},
  position:{"x":0,"y":0,"z":0},
  r:10,
  rotV:0.0,
  texture:""
}

var OBJECTS = [  ]
var SCENE;


function newObject(){
  $("#objectNameInput").val(defaultObject.name)

  $("#objectPositionXInput").val(defaultObject.position.x)
  $("#objectPositionYInput").val(defaultObject.position.x)
  $("#objectPositionZInput").val(defaultObject.position.x)

  $("#objectRadiusInput").val(defaultObject.r)
  $("#objectRotVInput").val(defaultObject.rotV)

  $("#isLightSourceCheckBox").val(defaultObject.isLightSource)

  $("#objectOrbitCenterPositionXInput").val(defaultObject.orbit.center.x)
  $("#objectOrbitCenterPositionYInput").val(defaultObject.orbit.center.y)
  $("#objectOrbitCenterPositionZInput").val(defaultObject.orbit.center.z)

  $("#objectOrbitAngleVInput").val(defaultObject.orbit.angleV)
  $("#objectOrbitColorInput").val(defaultObject.orbit.color)

  OBJECTS.push(jQuery.extend(true, {}, defaultObject))
  setupObjectsList(OBJECTS.slice())
  addObjectOnScene(OBJECTS[OBJECTS.length - 1])

}

function toggleSidebar(){
  $("#controlsPanel").toggle()
}

function setupObjectsList(objects){
  var objects = objects.slice()
  $("#objectsList").html("")
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

function addObjectOnScene(object){
  var sphereGeometry = new THREE.SphereGeometry(object.r, 32, 32)
  var sphereMaterial = new THREE.MeshLambertMaterial({ color: object.orbit.color });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = object.position.x;
  sphere.position.y = object.position.y;
  sphere.position.z = object.position.z;
  SCENE.add(sphere);
  if(object.isLightSource == true){
    surroundObjectWithLights(sphere, scene,  object.r + (2 * object.r))
  }
  object.Sphere = sphere;
  return object;
}

function setupLights(){
  var HemisphereLight = new THREE.AmbientLight( 0xffffff, 0.4);
  SCENE.add(HemisphereLight);
}


$(document).ready(function () {
  //Setting up variables
  var domElem = document.getElementById("WebGL-output");
  SCENE = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45
    , window.innerWidth * SIZE / window.innerHeight , 0.1, 50000);

  var renderer = new THREE.WebGLRenderer({
    canvas: domElem,
    precision:"highp",
    alpha: true
  });
  //renderer.setClearColor(0xEEEEEE);
  renderer.setSize(window.innerWidth * SIZE, window.innerHeight);
  var texloader = new THREE.TextureLoader()


  setupObjectsList(OBJECTS)
  OBJECTS.map(addObjectOnScene)
  setupLights()
  camera.lookAt(SCENE.position);
  camera.position.x = SCENE.position.x;
  camera.position.y = SCENE.position.y;
  camera.position.z = SCENE.position.z + 500;
  render()

  //Our loop
  function render() {
    requestAnimationFrame(render);
    renderer.render(SCENE, camera);
  }
});
