$( document ).ready(function() {

  $('.cb1').change(function () {
    $.ajax({

      type: "GET",
      url: '/yelp_prefs',
      data: { 'here': 'lol'},
      success: function(data) {
        alert("hello")
      },
      error: function(data) {
        alert(data)
      }
    });
  });
});