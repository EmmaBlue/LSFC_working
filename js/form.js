$(".contact-form").submit(function(){var o=$(this).serialize();return $.ajax({url:"sender.php",type:"POST",data:o,cache:!1,success:function(o){console.log(o)},error:function(o,r){"error"==r&&console.log(r)}}),!1});
