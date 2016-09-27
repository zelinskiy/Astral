var DIST = 5;
var ROT_SPEED = 0.01;
var LOADING_TIMEOUT = 250;
var LOADING_FADE_TIME = 1500;

function search(){
  window.location.assign("/search/" + $("#searchPatternInput").val())
}

function loadSearchResults(pattern){
  $.ajax({
		type: "GET",
		url: "/find/" + decodeURI(pattern),
		success:function(res){
      processSearchResults(res, pattern)
    }
	})
}

function loadSystemsWithObject(id, callback){
  $.ajax({
		type: "GET",
		url: "/systemsWithObject/" + id,
		success:callback
	})
}

function loadSystemsToDomElem(systems, domElemId, selectedObjectId){
  console.log(selectedObjectId)
  for(var i = 0; i<systems.length; i++){
    system = systems[i];
    $("#" + domElemId).append(""
      + '<a href=/system/' + system.id
      + '?selected_object=' + selectedObjectId + '>'
      + system.name
      + '</a><br/>'
    )
  }
}

function highlightSearchPattern(text, pattern){
  var re = new RegExp(pattern, "gi")
  console.log(re)
  return text.replace(
    re,
    function(match){
      return '<span class="highlightSearchPattern">' + match + '</span>'
    }
  )
}

function processSearchResults(rs, pattern){
  if(rs.length == 0){
    $("#searchResults").append(""
    + '<h1 class="text-center">'+ pattern +' not found </h1>'
    )
    return;
  }
  rs.slice().map(function(r){
    $("#searchResults").append(""
      + '<div class="row" id="objectDesc_' + r.id + '"><div class="col-md-7">'
      //+ '<img class="objectPreview" src="' + r.texture + '"/>'
      + '<canvas class="objectPreview" id="objectPreview_'
      + r.id
      + '"></canvas>'
      + '</div>'
      + '<div class="col-md-5 objectDesc"><h3>'
      + highlightSearchPattern(r.name, pattern)
      + '</h3>'
      + '<div id="systemRefs_' + r.id + '"></div>'
      + '</div></div><br/>'
      )
      loadSystemsWithObject(r.id, function(res){
        loadSystemsToDomElem(res, "systemRefs_" + r.id, r.id)
      })
      loadObjectPreview(r, "objectPreview_" + r.id)
  });

}

function loadObjectPreview(object, domElemId){
  var domElem = document.getElementById(domElemId);
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45
    , domElem.offsetWidth / domElem.offsetHeight , 0.1, 1000);
  camera.lookAt(scene.position);
  var renderer = new THREE.WebGLRenderer({
    canvas: domElem,
    precision:"highp",
    alpha: false
  });
  renderer.setSize(domElem.offsetWidth, domElem.offsetHeight);
  var texloader = new THREE.TextureLoader()
  //************************************************************
  var sphereGeometry = new THREE.SphereGeometry(object.r, 32, 32)
  var sphereMaterial = new THREE.MeshLambertMaterial();
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(0,0,0)
  scene.add(sphere);

  sphere.AstralObject = object;
  scene.add( new THREE.AmbientLight( 0xffffff, 1) )

  camera.position.x = scene.position.x;
  camera.position.y = scene.position.y;
  camera.position.z = scene.position.z + (object.r * DIST);

  texloader.load(
    object.texture,
    function(texture){
      sphere.material.map = texture
      render();
    });

  //Our loop
  function render() {
    requestAnimationFrame(render);
    if ($('#'+domElem.id+':hover').length != 0) {
      rotateSphere(sphere, ROT_SPEED)
    }
    if ($('#objectDesc_'+object.id+':hover').length != 0) {
      rotateSphere(sphere, ROT_SPEED)
    }
    renderer.render(scene, camera);
  }

  function rotateSphere(sphere, speed){
    console.log("!")
    sphere.rotation.y += speed;
  }
}



$(document).ready(function(){
  var searchPattern = decodeURI(window.location.pathname.split('/').pop())
  $("#searchPatternInput").val(searchPattern)
  loadSearchResults(searchPattern)
  $("#searchPatternInput").keypress(function(event){
      if(event.keyCode == 13) { search() }
  })
  setTimeout(function(){
    $("#loadingScreenDiv").fadeOut(LOADING_FADE_TIME)
  }, LOADING_TIMEOUT)
});
