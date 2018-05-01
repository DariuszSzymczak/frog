$(document).ready(function () {
  add_button_to_menu('addmenu_button', 'Dodaj Menu', createMenu);
});

function addmenu_getPages() {
  let res;


}

function createMenu() {
  let menu_ID;
  let box = create_box('addmenu_button', '', '', '');
  let name_input = `<input type='text' id='addmenu_input_name' placeholder='podaj nazwe menu' style="margin-bottom: 1vw"></input></br>`;
  let select_input = '<div id="addmenu_selects" style="display:none" >\
    <label>Wybierz Stronę </label><select id ="addmenu_input_select"></select>\
    <table id="addmenu_table"></table></div>';
  let page_list = addmenu_getPages();
  $('#' + box).append(name_input + select_input);
  $('#addmenu_table').append('<tr><td colspan="5"><button id="addmenu_table_button_down" class="menu_long_button2">+</button></td></tr>'); 
  $('#' + box).append('<button id="addmenu_create_button" class="menu_long_button2">Stwórz Menu</button>');
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
     menu_ID = add_element_to_target(target_container,'nav','nav',-1,'editMenu');
    $('#'+menu_ID).addClass('navbar navbar-dark bg-dark');
    $('#'+menu_ID).append(`<ul id="${menu_ID}_ul" class="navbar-nav mr-auto"></ul>`);
    

  });

  function addTr(direction) {
    var name = $('#addmenu_input_select').val();
    let link = `<li id="${menu_ID}_li_${name}" class="nav-item"><a class="nav-link" href="#${name}_content">${name}</a></li>`;
    let tr = `<tr><td colspan='4'>${name}</td><td colspan='1'class="addmenu_delete" data-name="${name}">\
    <img src="img/x.png"/ class="css_menu_img addmenu_img"></td></tr>`;
    if(direction == true) {
      $('#addmenu_table_button_up').parent().parent().after(tr); 
      $(`#${menu_ID}_ul`).prepend(link);
    }
    else{
        $('#addmenu_table_button_down').parent().parent().before(tr);   
        $(`#${menu_ID}_ul`).append(link);
    }
    $('.addmenu_delete').on('click',function(){
      $(this).parent().remove();
      $(`#${menu_ID}_li_${name}`).remove();
    });
  }

  $('#addmenu_table_button_down').click(function(){
    if($('#addmenu_table_button_up').length == 0 ){
      $('#addmenu_table').prepend('<tr><td colspan="5"><button id="addmenu_table_button_up" class="menu_long_button2">+</button></td></tr>');
      $('#addmenu_table_button_up').click(function(){addTr(true)});  
    } 
    addTr('');
  });


}

function editMenu(){

}