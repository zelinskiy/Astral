var LOADING_TIMEOUT = 0;
var LOADING_FADE_TIME = 0;


function setupList(systems){
  for(i=0; i<systems.length; i++){
    var system = systems[i]
    $("#systemsList").append(""
      +'<div class="row"><div class="col-md-7"><a href="'
      + "/system/" + system.id
      +'"><img class="img-responsive center-block systemPictureImage" src="'
      + system.picture
      + '"></a></div><div class="col-md-5"><h3>'
      + system.name
      + '</h3><h4>'
      + system.description
      + '</h4><a class="btn btn-primary" href="'
      + "/system/" + system.id
      + '">View System'
      + '</span></a></div></div><br/><br/><br/>'
      )
  }
  setTimeout(function(){
    $("#loadingScreenDiv").fadeOut(LOADING_FADE_TIME)
  }, LOADING_TIMEOUT)
}


function loadAllSystems(){
  var res;
  $.ajax({
    async: false,
		type: "GET",
		url: '/systems',
		success:function(r) {
			console.log("loaded all systems")
      res = r;
		}
	});
  return res;
}

function search(){
  window.location.assign("/search/" + $("#searchPatternInput").val())
}

$(document).ready(function(){
  $("#searchPatternInput").keypress(function(event){
    if(event.keyCode == 13) { search() }
  })
  setupList(loadAllSystems());
})
