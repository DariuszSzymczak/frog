// set values of elements width in main screen
$(document).ready(function () {

  $(main_container).attr('data-width', 65);
  $(main_container).attr('data-left', 30);
  $(main_container).on('mousedown', function () {
    $(this).find('*').on('mouseup', target_element_mouse)
  });

  $.ajax({
      url: "http://frog.ct8.pl/:9000",
      type: "post", //typ połączenia
      contentType: 'application/x-www-form-urlencoded', //gdy wysyłamy dane czasami chcemy ustawić ich typ
      data: { //dane do wysyłki
        data: 'test'
      }
    })
    .done(function (response) {
      console.log(response);
    })
    .fail(function () {
      console.warn("Wystąpił błąd w połączniu");
    });

});

// hide and show left menu, set width of content 
$('#hide_menu').on('click', function () {
  $(left_menu).toggle();
  var main_container_width = $(main_container).attr('data-width');
  var main_container_left = $(main_container).attr('data-left');
  if ($('#hide_menu').attr('data-hide') == 0) {
    $(main_container).css({
      "width": '100vw',
      "left": '0vw'
    });
    $('#hide_menu').attr('data-hide', 1);
    $('#hide_menu').text('POKAŻ MENU');
  } else {
    $(main_container).css({
      "width": main_container_width + 'vw',
      "left": main_container_left + 'vw'
    });
    $('#hide_menu').attr('data-hide', 0);
    $('#hide_menu').text('UKRYJ MENU');
  }

});

$('#right_menu_delete').on('click', right_menu_delete);
$('#right_menu_edit').on('click', right_menu_edit);