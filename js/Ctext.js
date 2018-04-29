$(document).ready(function () {
    add_button_to_menu('text_button', 'Dodaj Tekst', Create_textarea);

});

function Create_textarea()
{
    $('#blur').css({'display':'block'}).animate({opacity:'1'},300);
    var inner_text = '<span> \
      <button id="info_box_ok">POTWIERDŹ</button> \
      <button id="info_box_cancel">ANULUJ</button> \
      </span> \
      <textarea id="info_box_textarea" placeholder="wpisz tekst" ></textarea> ';
  
    $('#info_box').html(inner_text);
    $('#info_box_ok').off();
  
    
    $('#info_box_ok').click(function(){      
      const text_item = add_element_to_target(target_container,'p','p','','edit_text');
      $('#'+target_container).append($('#info_box_textarea').val());
      $('#blur').animate({opacity:'0'},300).css({'display':'none'});
    });  
    //cancel save page
$('#info_box_cancel').on('click', function () {
  $('#blur').animate({opacity: '0'}, 300).css({'display': 'none'});
});

}

function edit_text()
{
  var edit_text = $('#'+target_container).text();
  $('#blur').css({'display':'block'}).animate({opacity:'1'},300);  
    $('#info_box_textarea').text(edit_text);
    $('#info_box_ok').off();

    $('#info_box_ok').click(function(){      
      $('#'+target_container).html($('#info_box_textarea').val());
      $('#blur').animate({opacity:'0'},300).css({'display':'none'});
    }); 
}