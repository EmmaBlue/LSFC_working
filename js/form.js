$('.contact-form').submit(function() {
  debugger;
  var data = $(this).serialize();

  $.ajax({
      url: "sender.php",
      type: "POST",
      data: data,
      cache: false,
      success: function(data) {
      	console.log(data);
      },
      error: function (a, b) {
        if (b == 'error') {
          console.log(b)
          //$('#result-message').addClass('alert alert-danger').html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> Error Sending Message! Please try again.').delay(500).slideDown(500).delay(5000).slideUp('slow');
        };
        //$btn.button('reset');
      }
  });

  return false;
});
