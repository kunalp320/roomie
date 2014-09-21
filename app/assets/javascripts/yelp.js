$( document ).ready(function() {

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
  });
    $('.cb2').change(function () {
      if($(this).is(":checked")) {
        $.ajax({

          type: "GET",
          url: '/yelp_prefs',
          data: {type: 'coffee'},
          success: function(data) {
            alert(data)
            alert("hello")
          },
          error: function(data) {
            alert(data)
          }
        });
      }
  });
  $('.cb3').change(function () {
    if($(this).is(":checked")) {
      $.ajax({

        type: "GET",
        url: '/yelp_prefs',
        data: {type: 'bars'},
        success: function(data) {
          alert("hello")
        },
        error: function(data) {
          alert(data)
        }
      });
    }
  });  
  $('.cb4').change(function () {
    if($(this).is(":checked")) {
      $.ajax({

        type: "GET",
        url: '/yelp_prefs',
        data: {type: 'clubs'},
        success: function(data) {
          alert("hello")
        },
        error: function(data) {
          alert(data)
        }
      });
    }
  });
});