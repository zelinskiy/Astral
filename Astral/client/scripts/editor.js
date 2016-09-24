var SIZE = 0.7;


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
