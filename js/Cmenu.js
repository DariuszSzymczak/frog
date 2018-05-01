$(document).ready(function () {
  add_button_to_menu('addmenu_button', 'Dodaj Menu', createMenu);
});

function createMenu() {
  check_to_create('addmenu_button',function(){

    //list of first box items
      let menu_ID;
      let box = create_box('addmenu_button', '', '',deleteMenu);
      let name_input = `<input type='text' id='addmenu_input_name' placeholder='podaj nazwe menu' style="margin-bottom: 1vw"></input></br>\
      <label for="addmenu_fixed">Przyklejone Menu: </label><input type="checkbox" name="addmenu_fixed" id="addmenu_fixed"></input></br>`;

    //list of second box items  
      let select_input = '<div id="addmenu_selects" style="display:none" >\
        <label>Wybierz Stronę </label><select id ="addmenu_input_select"></select>\
        <table id="addmenu_table"></table></div>';

    // append all to box    
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
    // first box button to create menu
      $('#addmenu_create_button').on('click', function () {
        let name_val=$('#addmenu_input_name').val();
        $('#addmenu_input_name').fadeOut();
        $(this).fadeOut();
        $('#addmenu_selects').fadeIn();
        menu_ID = add_element_to_target(target_container,name_val,'nav',-1,'editMenu');
        $('#'+menu_ID).attr('data-name',name_val);
        $('#'+menu_ID).addClass('navbar navbar-dark bg-dark');  
        if($('#addmenu_fixed:checked').length == 1) $('#'+menu_ID).addClass('fixed-top');
        $('#'+menu_ID).append(`<ul id="${menu_ID}_ul" class="navbar-nav mr-auto"></ul>`);
        
        });

        function addTr(direction) {
          var name =  $('#addmenu_input_select').val();
          let link = `<li id="${menu_ID}_li_${name}" class="nav-item" data-name="${name}"><a class="nav-link" href="#${name}_content">${name}</a></li>`;
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
  });



}

function editMenu(){
createMenu();
let menu_ID = target_container;
//set name of menu
$('#addmenu_input_name').val($('#'+target_container).attr('data-name'));

//get items from target menu
$('#'+target_container).find('.nav-item').each(function(){
  let name = $(this).attr('data-name');
  let tr = `<tr><td colspan='4'>${name}</td><td colspan='1'class="addmenu_delete" data-name="${name}">\
  <img src="img/x.png"/ class="css_menu_img addmenu_img"></td></tr>`;
});
}

function deleteMenu(){
  $('#'+target_container).remove();
}