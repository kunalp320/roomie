$( document ).ready(function() {
  var mapOptions = {
      center: new google.maps.LatLng(37.7833, -122.4167),
      zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);

  $.ajax({
    type: "GET",
    url: "/get_list",
    success: function(data) {
      console.log(data);
      console.log('lol');
      alert("success")
    },
    error: function(data) {
      alert("error")
    }
  })
    
});
