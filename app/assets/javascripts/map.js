$( document ).ready(function() {
var shapes_added_so_far = [];

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
        $.ajax({
          type: "GET",
          url: '/save_prefs',
          data: { 'here': 'lol'},
          success: function(data) {
            alert("hello")
          },
          error: function(data) {
            alert(data)
          }
        });
        shapes_added_so_far.push(shape_added);
        shape_added.setEditable(false);
        drawingManager.setDrawingMode(null);
      }
    });

    drawingManager.setMap(map);
  }


  initialize();
});
