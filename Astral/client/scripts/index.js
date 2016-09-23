function setupList(systems){
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
