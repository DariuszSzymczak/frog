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
  
      //send site in ajax 
    $('#info_box_ok').click(function(){
      $('#'+target_container).append(`<p>${$('#info_box_textarea').val()}</p>`);
      $('#blur').animate({opacity:'0'},300).css({'display':'none'});
    });  
}