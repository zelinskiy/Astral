
var SIZE = 1;
var CONTROLS;
var FOCUS_DISTANCE_COEFF = 5;
var SIMULATION_ACTIVE = true;
var ORBITS_OPACITY = 0.3;
var ORBITS_SHOWN = true;
var LOADING_TIMEOUT = 0;
var LOADING_FADE_TIME = 0;
var COMPLETE_VIEW_DISTANCE_COEFF = 2;

//TODO: remove global variable
var SPHERES;
var SAVED_POSITIONS = [];
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



function loadHtml(path){
  var res;
  $.ajax({
    async: false,
    cache:false,
		type: "GET",
		url: path,
		success:function(r) {
      res = r;
		}
	});
  return res;
}

function loadAstralObject(id){
  var res;
  $.ajax({
    async: false,
    cache:false,
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
    cache:false,
		type: "GET",
		url: '/loadsystem/' + id,
		success:function(r) {
      res = r;
		}
	});
  return res;
}

//RECURSIVE
function loadManyTextures(spheres, render, texloader){
  if(spheres.length == 0) {
    render();
    setTimeout(function(){
      $("#loadingScreenDiv").fadeOut(LOADING_FADE_TIME)
    }, LOADING_TIMEOUT)
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
  var prec = 1
  $("#positionLabel").html(
    "X="   +  Math.floor(pos.x)
    + " Y=" + Math.floor(pos.y)
    + " Z=" + Math.floor(pos.z)
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
  setupBookmarksHandlers(objects.find(function(o){return true;}))
  loadLecture();
  return objects;
}

//Must be replaced with an actual function programmatically!
var loadLecture = function() {  }
var loadDescription = function() {  }
var loadDiscussion = function() {  }
var loadTest = function() {  }
var sendDiscussionMessage = function() {  }

function unselectAllBookmarks(){
  $(".bookmark").each(function() {
    $(this).toggleClass("active", false);
  });
}

function loadDiscussionHtml(messages){
  return "<br/>" +
  '<div id="discussionMessages">'
  + messages.slice().map(function(m){
    return "<p>" + m.text + "</p><hr/>"
  }).join("")
  + '</div>'
  + '<div id="searchForm" class=" input-group" >'
  + '<input id="discussionMessageInput" type="text" class="form-control">'
  + '<span class="input-group-btn">'
  + '<button class="btn btn-default" type="button" onclick="sendDiscussionMessage()">Send!</button>'
  + '</span></div>'
}

function setupBookmarksHandlers(object){
  loadLecture = function(){
    unselectAllBookmarks()
    $("#object_name").html(object.name);
    $("#object_text").html(loadHtml(object.lecture));
    $("#lectureBookmark").toggleClass("active", true);
  }
  loadDescription = function(){
    unselectAllBookmarks()
    $("#object_name").html(object.name);
    $("#object_text").html(loadHtml(object.description));
    $("#descriptionBookmark").toggleClass("active", true);
  }
  loadDiscussion = function(){
    unselectAllBookmarks()
    $("#object_name").html(object.name);
    $("#object_text").html(loadDiscussionHtml(object.discussion.messages));
    $("#discussionBookmark").toggleClass("active", true);
    $("#discussionMessageInput").keypress(function(e){
      if(e.keyCode == 13){ sendDiscussionMessage() }
    })
  }
  loadTest = function(){
    unselectAllBookmarks()
    $("#object_name").html(object.name);
    $("#object_text").html("Test for " + object.name);
    $("#testBookmark").toggleClass("active", true);
  }
  sendDiscussionMessage = function(){
    var msg = $("#discussionMessageInput").val();
    if(msg.length > 0){
      $("#discussionMessages").append("<p>" + msg + "</p><hr/>")
      $("#object_text").scrollTop($("#object_text").prop("scrollHeight"));
      $("#discussionMessageInput").val("")
      return true;
    }
    return false;
  }
}

function loadSpheresOnScene(scene, camera){
  var objects = loadSetupSystem();
  var spheres = objects.map(function(object){
    var sphereGeometry = new THREE.SphereGeometry(object.r, 32, 32)
    var sphereMaterial = new THREE.MeshLambertMaterial();
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = object.position.x;
    sphere.position.y = object.position.y;
    sphere.position.z = object.position.z;
    scene.add(sphere);
    sphere.AstralObject = object;
    if(object.isLightSource == true){
      surroundObjectWithLights(sphere, scene,  object.r + (2 * object.r))
    }
    return sphere;
  })
  camera.position.x = scene.position.x;
  camera.position.y = scene.position.y;
  camera.position.z = scene.position.z + 500;

  SPHERES = spheres;
  return spheres;
}

function surroundObjectWithLights(object, scene, distance){
  var color = 0xffffff;
  var intensity = 0.4;
  var d = distance;
  var light1 = new THREE.PointLight(color, intensity, 0);
  light1.position.set(d, 0, 0);
  object.add(light1);
  var light2 = new THREE.PointLight(color, intensity, 0);
  light2.position.set(-d, 0, 0);
  object.add(light2);
  var light3 = new THREE.PointLight(color, intensity, 0);
  light3.position.set(0, d, 0);
  object.add(light3);
  var light4 = new THREE.PointLight(color, intensity, 0);
  light4.position.set(0, -d, 0);
  object.add(light4);
  var light5 = new THREE.PointLight(color, intensity, 0);
  light5.position.set(0, 0, d);
  object.add(light5);
  var light6 = new THREE.PointLight(color, intensity, 0);
  light6.position.set(0, 0, -d);
  object.add(light6);


}

function showLightsOnScene(scene){
  var HemisphereLight = new THREE.AmbientLight( 0xffffff, 0.4);
  scene.add(HemisphereLight);
}

function isNodeAstralObject(node){
  return node !== undefined
      && node.object !== undefined
      && node.object.AstralObject !== undefined
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
    var intersect = intersects.find(function(){return true;})
    if(isNodeAstralObject(intersect)){
      var sphere = intersect.object;
      sphere.material.color.set( 0xffff00 );
      $("#objectNameLabel").html(sphere.AstralObject.name)
    }
  }

  function onMouseDown( event ) {
    if(event.which !== 1) { return; }
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );
    var intersect = intersects.find(function(){return true;})
    if(isNodeAstralObject(intersect)){
      selectObject(intersect.object.AstralObject.id)
    }
  }
  window.addEventListener( 'mousemove', onMouseMove, false );
  window.addEventListener( 'mousedown', onMouseDown, false );

}

function selectInitialObject(spheres){
  var id = getQueryVariable("selected_object")
  if(id === false){
    selectObject(spheres
      .slice()
      .find(function(s){ return true; })
      .AstralObject
      .id)
    SIMULATION_ACTIVE = true;
  }
  else{
    selectObject(spheres
      .slice()
      .find(function(s){ return s.AstralObject.id == id; })
      .AstralObject
      .id)
    SIMULATION_ACTIVE = false;
  }
  updatePlayPauseSimulationButton();
  hideSidebar();
}

var savePosition = function(){ }
function setupSavePosition(camera){
  savePosition = function(){
    var p = {
        x:camera.position.x,
        y:camera.position.y,
        z:camera.position.z
      }
    SAVED_POSITIONS.push(p)
  }
}
var loadPosition = function(){ }
function setupLoadPosition(camera){
  loadPosition = function(){
    var p = SAVED_POSITIONS.pop()
    if(p === undefined) return;
    camera.position.x = p.x
    camera.position.y = p.y
    camera.position.z = p.z

    hideSidebar()
    SIMULATION_ACTIVE = true;
    updatePlayPauseSimulationButton();
  }
}

//Must be replaced with an actual function programmatically!
var selectObject = function(id){};

function setupSelectObject(spheres){
  selectObject = function(id){
    SIMULATION_ACTIVE = false;
    savePosition();
    updatePlayPauseSimulationButton();
    var object = spheres.find(function(s){return s.AstralObject.id == id;});
    lookAtObject(object, 100, object.AstralObject.r * FOCUS_DISTANCE_COEFF);
    setupBookmarksHandlers(object.AstralObject)
    showSidebar()
    loadLecture();
  }
}

function lookAtObject(object, delay, dist){
  setTimeout(function(){
    CONTROLS.object.position.x = object.position.x + dist;
    CONTROLS.object.position.y = object.position.y;
    CONTROLS.object.position.z = object.position.z;
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

function setupWASDQE(domElem, controls, speed){
  function onKeyDown( event ) {
    switch(event.keyCode){
      //W
      case 87:
        controls.target.z -= speed
        controls.object.position.z -= speed;
        break;
      //S
      case 83:
        controls.target.z += speed
        controls.object.position.z += speed;
        break;
      //A
      case 65:
        controls.target.x -= speed
        controls.object.position.x -= speed;
        break;
      //S
      case 68:
        controls.target.x += speed
        controls.object.position.x += speed;
        break;
      //Q
      case 81:
        controls.target.y -= speed
        controls.object.position.y -= speed;
        break;
      //E
      case 69:
        controls.target.y += speed
        controls.object.position.y += speed;
        break;
    }
  }
  window.onkeydown = onKeyDown;
}

function setupControls(camera, domElem){
  CONTROLS = new THREE.OrbitControls (camera, domElem)
  CONTROLS.mouseButtons = {
    ORBIT: THREE.MOUSE.RIGHT,
    ZOOM: THREE.MOUSE.MIDDLE,
    PAN: THREE.MOUSE.LEFT };
    //setupWASDQE(domElem, CONTROLS, 10);
}

function rotateSpheres(spheres){
  spheres.map(function(s){
    s.rotation.y += s.AstralObject.rotV;
  })
}

function rotateSpheresOrbits(spheres){
  if(SIMULATION_ACTIVE == false) return;
  spheres.map(function(s){
    /*
    var theta = s.AstralObject.orbit.angleV * Math.PI / 180;
    var px = s.position.x
    var pz = s.position.z
    var ox = s.AstralObject.orbit.center.x
    var oz = s.AstralObject.orbit.center.z
    s.position.x = Math.cos(theta) * (px-ox) - Math.sin(theta) * (pz-oz) + ox
    s.position.y =  Math.sin(theta) * (px-ox) + Math.cos(theta) * (pz-oz) + oz
    */
    var x = s.AstralObject.orbit.center.x
      + (s.position.x - s.AstralObject.orbit.center.x)*Math.cos(s.AstralObject.orbit.angleV)
      - (s.position.z - s.AstralObject.orbit.center.z)*Math.sin(s.AstralObject.orbit.angleV);
    var z = s.AstralObject.orbit.center.z
      + (s.position.x-s.AstralObject.orbit.center.x)*Math.sin(s.AstralObject.orbit.angleV)
      + (s.position.z-s.AstralObject.orbit.center.z)*Math.cos(s.AstralObject.orbit.angleV);

    s.position.set(x, s.position.y, z)

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

function toggleSimulationActive(){
  SIMULATION_ACTIVE = !SIMULATION_ACTIVE;
  updatePlayPauseSimulationButton();
}

function updatePlayPauseSimulationButton(){
  $("#playPauseSimulationButton").html(SIMULATION_ACTIVE?"❚❚":"►")
}

function toggleHelpControls(){
  $("#helpControls").toggle();
}

function hideHelpControls(){
  $("#helpControls").hide();
}

function distanceBetween(a, b){
  return Math.sqrt(
      (a.x-b.x)*(a.x-b.x)
    + (a.y-b.y)*(a.y-b.y)
    + (a.z-b.z)*(a.z-b.z)
  );
}

function toggleOrbits(){
  ORBITS_SHOWN = !ORBITS_SHOWN
  if(ORBITS_SHOWN === true){
    showOrbitsLines()
    $("#toggleOrbitsButton").html("Orbits ✔")
  }
  else{
    hideOrbitsLines()
    $("#toggleOrbitsButton").html("Orbits ✘")
  }
}

//Must be replaced with an actual function programmatically!
var hideOrbitsLines = function() { }
var showOrbitsLines = function() { }

function drawOrbitsLines(scene, objects){
  for(var i=0; i< objects.length; i++){
    var object = objects[i];
    if(object.orbit.angleV == 0){ continue; }
    var material = new THREE.LineBasicMaterial( {
      color: (new THREE.Color(object.orbit.color)),
      transparent: true, opacity: ORBITS_OPACITY
    } )
    var radius = distanceBetween(object.position, object.orbit.center);
    var geometry = new THREE.CircleGeometry( radius, radius / 2 )
    geometry.vertices.shift();
    var line = new THREE.Line( geometry, material )
    line.position.set(
      object.orbit.center.x,
      object.orbit.center.y,
      object.orbit.center.z
    );
    line.rotation.x = Math.PI / 2;
    scene.add(line);
  }

  hideOrbitsLines = function(){
    scene.traverse(function(node) {
      if (node instanceof THREE.Line) {
        node.material.opacity = 0;
      }
    });
  }

  showOrbitsLines = function(){
    scene.traverse(function(node) {
      if (node instanceof THREE.Line) {
        node.material.opacity = ORBITS_OPACITY;
      }
    });
  }

}


function toggleSidebar(){
  $("#object_information").toggle()
}

function showSidebar(){
  $("#object_information").show()
}

function hideSidebar(){
  $("#object_information").hide()
}

function findBiggestDistanceToCenter(objects){
  var max = 0;
  var center = { x:0, y:0, z:0 }
  for(i = 0; i<objects.length; i++){
    var d = distanceBetween(objects[i].position, center)
    if(d > max){
      max = d
    }
  }
  return max;
}

var viewSystemCompletely = function() { }

function setupViewSystemCompletely(camera, objects){
  var m = findBiggestDistanceToCenter(objects);
  viewSystemCompletely = function(){
    camera.position.set(0, m * COMPLETE_VIEW_DISTANCE_COEFF, 0)
    hideSidebar()
    SIMULATION_ACTIVE = true;
    updatePlayPauseSimulationButton();
    savePosition();
  }
}

$(document).ready(function () {
  //Setting up variables
  var domElem = document.getElementById("WebGL-output");
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45
    , window.innerWidth * SIZE / window.innerHeight , 0.1, 50000);
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
  drawOrbitsLines(scene, spheres.slice().map(function(s){ return s.AstralObject; }), 0x0000ff)
  loadManyTextures(spheres.slice(), render, texloader)
  showLightsOnScene(scene);
  setupObjectsList(spheres.slice().map(function(s){ return s.AstralObject; }))
  setupSelectObject(spheres.slice())
  setupViewSystemCompletely(camera, spheres.slice().map(function(s){ return s.AstralObject; }))
  setupSavePosition(camera)
  setupLoadPosition(camera)
  selectInitialObject(spheres)
  viewSystemCompletely();

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
