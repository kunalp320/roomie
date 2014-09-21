$( document ).ready(function() {
var shapes_added_so_far = [];
var map;

  function put_markers_on_map(list_of_marker_coords) {
    for(var i = 0; i < list_of_marker_coords.length; i++) {
      var coords = list_of_marker_coords[i];
      var lat = coords['lat'];
      var lon = coords['long'];
      var titl = coords['title'];
      var lat_long = new google.maps.LatLng(lat, lon);

      var marker = new google.maps.Marker({
          position: lat_long,
          map: map,
          title: titl
      });
    }
  }

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
      center: new google.maps.LatLng(37.7833, -122.4167),
      zoom: 12
    };

    map = new google.maps.Map(document.getElementById('map_canvas'),
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
        shapes_added_so_far.push(shape_added);
        shape_added.setEditable(false);
        drawingManager.setDrawingMode(null);
      }
    });



    drawingManager.setMap(map);
  }


  initialize();

  $('.cb1').change(function () {
    if($(this).is(":checked")) {
      $.ajax({

        type: "GET",
        url: '/yelp_prefs',
        data: {type: 'food'},
        success: function(data) {
          put_markers_on_map(data)
          
          
        },
        error: function(data) {
          alert(data)
        }
      });
    }
      else {

      }
    
  });
    $('.cb2').change(function () {
      if($(this).is(":checked")) {
        $.ajax({

          type: "GET",
          url: '/yelp_prefs',
          data: {type: 'coffee'},
          success: function(data) {
            put_markers_on_map(data)
            
          },
          error: function(data) {
            alert(data)
          }
        });
      }
      else {

      }
  });
  $('.cb3').change(function () {
    if($(this).is(":checked")) {
      $.ajax({

        type: "GET",
        url: '/yelp_prefs',
        data: {type: 'bars'},
        success: function(data) {
          put_markers_on_map(data)
        },
        error: function(data) {
          alert(data)
        }
      });
    }
    else {

    }
  });  
  $('.cb4').change(function () {
    if($(this).is(":checked")) {
      $.ajax({

        type: "GET",
        url: '/yelp_prefs',
        data: {type: 'clubs'},
        success: function(data) {
          put_markers_on_map(data)
        },
        error: function(data) {
          alert(data)
        }
      });
    }
    else {
      
    }
  });
});
