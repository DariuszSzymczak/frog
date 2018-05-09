$(document).ready(function () {
  add_button_to_menu('addsites_button', 'Dodaj Stronę', AddSite);
});

function AddSite(edit_values) {
  check_to_create('addsites_button', function () {

    let box = create_box('addsites_button', '', '', deleteSites);

    //list of second box items  
    let select_input = '<div id="addsites_selects">\
        <label>Wybierz Stronę </label><select id ="addsites_input_select"></select>\
        <table id="addsites_table"></table></div>';

    // append all to box    
    $('#' + box).append(select_input);
    $('#addsites_table').prepend('<tr><td colspan="5"><button id="addsites_table_button_up" class="menu_long_button2">+</button></td></tr>');
    $('#addsites_table').append('<tr><td colspan="5"><button id="addsites_table_button_down" class="menu_long_button2">+</button></td></tr>');
    let sites_json = [{}];
    $.ajax({
        url: "http://frog.ct8.pl/pages/",
        type: "post", //typ połączenia
        data: {
          "name": "getPages"
        }
      })
      .done(function (page_list) {

        for (let x = 0; x < page_list.length; x++) {
          sites_json[x] = page_list[x];
          $('#addsites_input_select').append(`<option>${page_list[x].name}</option>`);
        }
      })
      .fail(function () {
        console.warn("addsites: Wystąpił błąd w połączniu");
      });
    console.log(sites_json);

    // direction -> true mean Up
    function addsites_addTr(direction, data) {
      var name = $('#addsites_input_select').val();
      if (data) name = data;
      let tr = `<tr><td colspan='4'>${name}</td><td colspan='1'class="addsites_delete" data-name="${name}">\
          <img src="img/x.png"/ class="css_menu_img addmenu_img"></td></tr>`;
      if (direction == true) {
        $('#addsites_table_button_up').parent().parent().after(tr);
      } else {
        $('#addsites_table_button_down').parent().parent().before(tr);
      }
      $(`.addsites_delete[data-name="${name}"]`).on('click', function () {
        $(this).parent().remove();
        $(`#${menu_ID}_li_${name}`).remove();
      });
    }
    
    addsites_addTr(false,'home');

    $('#addsites_table_button_down').click(function () {

      addsites_addTr(false);
    });
    $('#addsites_table_button_up').click(function () {
      addsites_addTr(true);
    });

    // if (edit_values) {
    //   menu_ID = target_container;
    //   //hide first box 
    //   $('#addmenu_box1').hide();
    //   $('#addmenu_selects').show();
    //   //add up plus button 
    //   $('#addmenu_table').prepend('<tr><td colspan="5"><button id="addmenu_table_button_up" class="menu_long_button2">+</button></td></tr>');
    //   $('#addmenu_table_button_up').click(function () {
    //     addTr(true)
    //   });
    //   for (let x = 0; x < edit_values.length; x++) addTr('', edit_values[x]);
    // }
  });



}

// function editMenu() {
//   let elements = [];
//   //get items from target menu
//   $('#' + target_container).find('.nav-item').each(function () {
//     let name = $(this).attr('data-name');
//     elements.push(name);
//   });
//   createMenu(elements);
// }

function deleteSites() {
  $('#' + target_container).remove();
}