$(document).ready(function()
{
  add_button_to_menu('addmenu_button','Dodaj Menu',createMenu);
});

function createMenu(){
    let box = create_box('addmenu_button','','','');
    let name_input = `<input type='text' id='addmenu_input_name' placeholder='podaj nazwe menu'></input>`;
    let select_input='<select id ="addmenu_input_select"></select>';
    let page_list = addmenu_getPages();
    $('#'+box).append(name_input+select_input);
    if(page_list == false)alert('błąd w łączeniu z bazą danych');
    else{
        for(let x=0;x<page_list;x++){
            console.log('dodaje: '+page_list[x].name)
            $('#addmenu_input_select').append(`<option>${page_list[x].name}</option>`);
        } 
    }
    function addmenu_getPages(){
        let res;
        $.ajax({
            url: "http://frog.ct8.pl/pages/",
            type: "post", //typ połączenia
            data: {
              "name": name_site
            }
          })
          .done(function (response) {
            res = response;
          })
          .fail(function () {
            console.warn("Wystąpił błąd w połączniu");
            res = false;
          });
          return res;
    }
}