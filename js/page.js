// set values of elements width in main screen
$(document).ready(function () {
  // $('#right_menu_style').delay(1000).trigger('click');
  $('#content').attr('data-width', 65);
  $('#content').attr('data-left', 30);
  $('#content').on('mousedown', function () {
    $('#content div').find('*').on('mouseup', target_element_mouse)
    $('#css_menu_exit').on('click',css_exit);
  });


});


// hide and show left menu, set width of content 
$('#hide_menu').on('click', function () {
  $(left_menu).toggle();
  var main_container_width = $('#content').attr('data-width');
  var main_container_left = $('#content').attr('data-left');
  var logo_width = $('#logo_box').attr('data-width');
  var logo_left = $('#logo_box').attr('data-left');
  if ($('#hide_menu').attr('data-hide') == 0) {
    $('#content').css({
      "width": '100vw',
      "left": '0vw'
    });
    $('#logo_box').css({
      "width": '100vw',
      "left": '0vw'
    });
    $('#hide_menu').attr('data-hide', 1);
    $('#hide_menu').text('POKAŻ MENU');
  } else {
    $('#content').css({
      "width": main_container_width + 'vw',
      "left": main_container_left + 'vw'
    });
    $('#logo_box').css({
      "width": logo_width + 'vw',
      "left": logo_left + 'vw'
    });
    $('#hide_menu').attr('data-hide', 0);
    $('#hide_menu').text('UKRYJ MENU');
  }

});

$('#right_menu_delete').on('click', right_menu_delete);
$('#right_menu_edit').on('click', right_menu_edit);

//click button to acceptpage. Name this site and send JSON to server.
$('#accept_page').on('click', function () {
  $('#blur').css({
    'display': 'block'
  }).animate({
    opacity: '1'
  }, 300);
  var inner_text = '<span> \
    <button id="info_box_ok">POTWIERDŹ</button> \
    <button id="info_box_cancel">ANULUJ</button> \
    </span> \
    <label for="info_box_input_name">Podaj nazwę dla strony: </label> \
    <input id="info_box_input_name" type="text"></input> ';

  $('#info_box').html(inner_text);
  $('#info_box_ok').off();
//cancel save page
$('#info_box_cancel').click(function () {
  $('#blur').animate({
    opacity: '0'
  }, 300).css({
    'display': 'none'
  });
});

  //send site in ajax 
  $('#info_box_ok').click(function () {
    var name_site = $('#info_box_input_name').val();
    var page_content = $('#content').html();
    $.ajax({
        url: "http://frog.ct8.pl/send/",
        type: "post", //typ połączenia
        data: {
          "name": name_site,
          "content": page_content
        }
      })
      .done(function (response) {
        console.log(response);
      })
      .fail(function () {
        console.warn("Wystąpił błąd w połączniu");
      });

    $('#blur').animate({
      opacity: '0'
    }, 300).css({
      'display': 'none'
    });
  });

});



//reload site
$('#restart_page').click(function () {
  location.reload();
});

