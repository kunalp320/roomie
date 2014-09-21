$( document ).ready(function() {
var shapes_added_so_far = [];
var map;
var last_info_window;
var type_to_markers = {};

  function put_markers_on_map(type_of_marker, list_of_marker_coords) {
    var all_markers = [];
    for(var i = 0; i < list_of_marker_coords.length; i++) {
      var coords = list_of_marker_coords[i];
      var lat = coords['lat'];
      var lon = coords['long'];
      var title = coords['title'];
      var lat_long = new google.maps.LatLng(lat, lon);
      var marker = new google.maps.Marker({
          position: lat_long,
          map: map,
          animation: google.maps.Animation.DROP
      });
      var info_window =  new google.maps.InfoWindow({
        content: title
      });
      google.maps.event.addListener(
        marker, 
        'click', 
        function(_marker, _info_window) {
          if (typeof last_info_window != 'undefined') {
            last_info_window.close();
          }
          _info_window.open(map, _marker);
          last_info_window = _info_window;
        }.bind(undefined, marker, info_window)
      );
      all_markers.push(marker);
    }
    type_to_markers[type_of_marker] = all_markers;
  }

  function clear_markers_of_type(type_to_clear) {
    var all_markers = type_to_markers[type_to_clear];
    for(var i = 0; i < all_markers.length; i++) {
      all_markers[i].setMap(null);
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
          window.location.href = '/results'
          
        },
        error: function(data) {
          alert("here")
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



    drawingManager.setDrawingMode(null);
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
          put_markers_on_map('food', data)
          
          
        },
        error: function(data) {
          alert(data)
        }
      });
    }
    else {
      clear_markers_of_type("food")
    }
    
  });
    $('.cb2').change(function () {
      if($(this).is(":checked")) {
        $.ajax({

          type: "GET",
          url: '/yelp_prefs',
          data: {type: 'coffee'},
          success: function(data) {
            put_markers_on_map('coffee', data)
            
          },
          error: function(data) {
            alert(data)
          }
        });
      }
      else {
        clear_markers_of_type("coffee")
      }
  });
  $('.cb3').change(function () {
    if($(this).is(":checked")) {
      $.ajax({

        type: "GET",
        url: '/yelp_prefs',
        data: {type: 'bars'},
        success: function(data) {
          put_markers_on_map('bars', data)
        },
        error: function(data) {
          alert(data)
        }
      });
    }
    else {
      clear_markers_of_type("bars")
    }
  });  
  $('.cb4').change(function () {
    if($(this).is(":checked")) {
      $.ajax({

        type: "GET",
        url: '/yelp_prefs',
        data: {type: 'clubs'},
        success: function(data) {
          put_markers_on_map('clubs', data)
        },
        error: function(data) {
          alert(data)
        }
      });
    }
    else {
      clear_markers_of_type("clubs")
    }
  });
});
