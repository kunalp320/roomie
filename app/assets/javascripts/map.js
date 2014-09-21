$( document ).ready(function() {
var shapes_added_so_far = [];

  $('.submit_profile').click(
    function() {
      var all_locations = []
      for(var i = 0; i < shapes_added_so_far.length; i++) {
        var shape_to_send = shapes_added_so_far[i];
        var ne = shape_to_send.getBounds().getNorthEast();
        var sw = shape_to_send.getBounds().getSouthWest();
        all_locations.push([[ne.lat(), ne.lng()], [sw.lat(), sw.lng()]]);
      }
      $.ajax({
        type: "GET",
        url: '/save_prefs',
        data: { 
          'here': all_locations,
          'length': all_locations.length
        },
        success: function(data) {
          alert("hello");
        },
        error: function(data) {
          alert(data);
        }
      });
    }
  );

  $('.clear_button').click(function () {
    for(var i = 0; i < shapes_added_so_far.length; i++) {
      var item_to_clear = shapes_added_so_far[i];
      item_to_clear.setMap(null);  
    }
    clear_all_shapes = [];
  });

  function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 8
    };

    var map = new google.maps.Map(document.getElementById('map_canvas'),
      mapOptions);

    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.RECTANGLE
        ]
      },
      rectangleOptions: {
        editable: true
      }
    });

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
      if(event.type == google.maps.drawing.OverlayType.RECTANGLE) {
        var shape_added = event.overlay;
        console.log(shape_added.getBounds().getNorthEast());
        shapes_added_so_far.push(shape_added);
        shape_added.setEditable(false);
        drawingManager.setDrawingMode(null);
      }
    });

    drawingManager.setMap(map);
  }


  initialize();
});
