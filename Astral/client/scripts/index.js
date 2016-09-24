function oldSetupList(systems){
  for(i=0; i<systems.length; i++){
    var system = systems[i]
    $("#systemsList").append(""
      + "<div class=\"row\"\>"
      + "<div class=\"col-md-5\"><a href=\"/system/"
      + system.id
      + "\">"
      + "<img class=\"systemPictureImage\" src=\"" +
      system.picture
      + "\"/>"
      + "</a></div>"
      + "<div class=\"system_description col-md-7\">"
      + "<h3>"
      + system.description
      + "</h3>"
      + "</div></div></div>"
      )
  }
}

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
      + '">View System ->'
      + '</span></a></div></div><br/><br/><br/>'
      )
  }
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

$(document).ready(function(){
  setupList(loadAllSystems());
})
