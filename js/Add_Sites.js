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
    

    // direction -> true mean Up
    function addsites_addTr(direction, data) {
      var name = $('#addsites_input_select').val();
      if (data) name = data;
      let content_data;
      for(let x=0;x<sites_json.length;x++){
        if(name == sites_json[x].name){
          content_data = `<div id="${name}_content">${sites_json[x].content}</div>`;
          break;
        } 
      } 
      let tr = `<tr><td colspan='4'>${name}</td><td colspan='1'class="addsites_delete" data-name="${name}">\
          <img src="img/x.png"/ class="css_menu_img addmenu_img"></td></tr>`;
      if (direction == true) {
        $('#addsites_table_button_up').parent().parent().after(tr);
        if(!data) $('#content').prepend(content_data);
      } else {
        $('#addsites_table_button_down').parent().parent().before(tr);
        if(!data) $('#content').append(content_data);
      }
      if(!data){
        addSites_changeNames(name);
        target($(`#${name}_content div`).first().attr('id'));
        $(`#${name}_content`).find('.plus_button').each(function(){$(this).remove()});
      } 
      $(`.addsites_delete[data-name="${name}"]`).on('click', function () {
        $(this).parent().remove();
        $(`#${name}_content`).remove();
      });
    }
    
      $('#addsites_table_button_down').click(function () {

      addsites_addTr(false);
    });
    $('#addsites_table_button_up').click(function () {
      addsites_addTr(true);
    });

    $('#content > div').each(function() {
        let ajdi = this.id.match(/.*_content/);
        if(ajdi){
        ajdi =  this.id.match(/^[a-z]*/);
        console.log('ajdi: '+ajdi);
        addsites_addTr(false,ajdi);
        }      
    });
  });



}

function addSites_changeNames(name){
  $(`#${name}_content *`).each(function(){
    let node_id = this.id;
    let new_id = node_id.replace('home',name);
    this.id = new_id;
  });
}

function deleteSites() {
  $('#' + target_container).remove();
}