$( document ).ready(function() {
  $('.login_button').click(function () {
    $('.sign_in_modal').removeClass('display_none');
    $('.sign_in_modal').addClass('display_block');
  });

  $('.close').click(function () {
    $('.sign_in_modal').removeClass('display_block');
    $('.sign_in_modal').addClass('display_none');
  });
});