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
      for(var i = 0; i < data.length; i++) {
        var rect = data[i];
        var a = rect['n_lat'];
        var b = rect['n_long'];

        var c = rect['s_lat'];
        var d = rect['s_long'];
        var rectangle = new google.maps.Rectangle({
          map: map,
          bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(a, b),
            new google.maps.LatLng(c, d))
        }); 

      }
      console.log(data);
      console.log('lol');

      alert("success")
    },
    error: function(data) {
      alert("error")
    }
  })
    
});
