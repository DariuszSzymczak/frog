// set values of elements width in main screen
$(document).ready(function () {

  $(main_container).attr('data-width', 65);
  $(main_container).attr('data-left', 30);
  $(main_container).on('mousedown', function () {
    $(this).find('*').on('mouseup', target_element_mouse)
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

//click button to acceptpage. Name this site and send JSON to server.
$('#accept_page').on('click',function(){
  $('#blur').css({'display':'block'}).animate({opacity:'1'},300);
});


//cancel save page
$('#info_box_cancel').on('click',function(){
  $('#blur').animate({opacity:'0'},300).css({'display':'none'});
});

//reload site
$('#restart_page').click(function() {
  location.reload();
});

//send site in ajax 
$('#info_box_ok').click(function(){
  var name_site = $('#info_box_input_name').val();
  var page_content = $('#content').html();
  $.ajax({
    url: "http://frog.ct8.pl/send/",
    type: "post", //typ połączenia
    contentType: 'aplication/json', //gdy wysyłamy dane czasami chcemy ustawić ich typ
    data: {
      "name" : name_site,
      "content" : page_content
    }
  })
  .done(function (response) {
    console.log(response);
  })
  .fail(function () {
    console.warn("Wystąpił błąd w połączniu");
  });
});