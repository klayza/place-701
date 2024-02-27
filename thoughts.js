$(document).ready(() => {
  $(".post").on("click", function() {
    let content = {
      header: "This is the header",
      description: "Hello world"
    };

    // Fill the dialog element .reader-dialog with content
    $('.reader-dialog').html(`
      <h1>${content.header}</h1>
      <p>${content.description}</p>
      <button class="close-dialog">Close</button>
    `);

    // Show the dialog and the backdrop with animation
    $('.reader-dialog').removeClass('hide').addClass('show');
    $('.dialog-backdrop').addClass('show');

    // Close dialog and backdrop on button click or escape key press
    $('.close-dialog').on('click', function() {
      $('.reader-dialog').addClass('hide').delay(300).queue(function(next){
        $(this).removeClass('show').empty();
        next();
      });
      $('.dialog-backdrop').removeClass('show');
    });

    $(document).on('keydown', function(e) {
      if (e.key === "Escape") {
        $('.reader-dialog').addClass('hide').delay(300).queue(function(next){
          $(this).removeClass('show').empty();
          next();
        });
        $('.dialog-backdrop').removeClass('show');
      }
    });
  });
});
