$(document).ready(function () {
  add_button_to_menu('addmenu_button', 'Dodaj Menu', createMenu);
});

function addmenu_getPages() {
  let res;


}

function createMenu() {
  let box = create_box('addmenu_button', '', '', '');
  let name_input = `<input type='text' id='addmenu_input_name' placeholder='podaj nazwe menu (Nagłówek)'></input></br>`;
  let select_input = '<div id="addmenu_selects" style="display:none" >\
    <label>Wybierz Stronę </label><select id ="addmenu_input_select"></select>\
    <table id="addmenu_table"></table></div>';
  let page_list = addmenu_getPages();
  $('#' + box).append(name_input + select_input);
  $('#addmenu_table').after('<button id="addmenu_table_button_down" class="menu_long_button">+</button>'); 
  $('#' + box).append('<button id="addmenu_create_button" class="menu_long_button">Stwórz Menu</button>');
  $.ajax({
      url: "http://frog.ct8.pl/pages/",
      type: "post", //typ połączenia
      data: {
        "name": "getPages"
      }
    })
    .done(function (page_list) {
      for (let x = 0; x < page_list.length; x++) {
        console.log('dodaje: ' + page_list[x].name);
        $('#addmenu_input_select').append(`<option>${page_list[x].name}</option>`);
      }
    })
    .fail(function () {
      console.warn("Wystąpił błąd w połączniu");
    });

  $('#addmenu_create_button').on('click', function () {
    $('#addmenu_input_name').fadeOut();
    $(this).fadeOut();
    $('#addmenu_selects').fadeIn();
  });

  function addTr(direction) {
    let tr = `<tr><td>${$('#addmenu_input_select').val()}</td><td class="css_menu_delete">\
    <img src="img/x.png"/ class="css_menu_img"></td></tr>`;
    if(direction == 'up') $('#addmenu_table').append(tr);
    else $('#addmenu_table').prepend(tr);
    $('.css_menu_delete').on('click',function(){$(this).parent().remove()});
  }

  $('#addmenu_table_button_down').click(function(){
    if($('#addmenu_table_button_up').length == 0 ){
      $('#addmenu_table').before('<button id="addmenu_table_button_up" class="menu_long_button">+</button>');
      $('#addmenu_table_button_up').click(addTr('up'));  
    } 
    addTr('');
  });


}