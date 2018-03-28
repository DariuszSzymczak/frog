$(document).ready(function()
{
  $(left_menu).append('<button id="div_button" class="deactive">stwórz pojemnik</button>');
  $('#div_button').on('click',Cdiv);
});

function Cdiv()
{
  let tip = '<h3>szerokość całej strony to 12</h3>';
  let inputs1 =  '<input type="text" id="div_name" name="div_name" placeholder="nazwa pojemnika"></input> \
  <label for="lg_width">Szerokość ( desktop ) : </label> <input id="div_lg_width" name="div_lg_width" type="number" min="1"  value="1" max="12"  ></input></br> \
  <label for="md_width">Szerokość ( tablet ) : </label> <input id="div_md_width" name="div_md_width" type="number" min="1" value="1" max="12"   ></br> \
  <label for="xs_width">Szerokość ( mobile ) : </label> <input id="div_xs_width" name="div_xs_width" type="number" min="1" value="1" max="12"   ></br>';
  let div_inner = '<div id="div_inner">'+tip+inputs1+'</div>';
  let div_outer ='<span id="div_outer" class="table_outer"><button id="div_cancel" class="cancel_button">X</button> \
  <button id="div_ok" class="ok_button" >OK</button></span>';


  if($('#div_inner').length == 0 && $('.table_outer:visible').length < 1)
  {
    if($('#table_button').hasClass('deactive')== false)
    {
      $('.focus').removeClass('focus');
      $(this).addClass('focus');    
      $('#div_button').after(div_inner + div_outer);
      $('#div_cancel').on('click',div_outer_buttons);


      $('#div_ok').on('click',function()
      {
        let name = $('#div_name').val();
        if($('#'+name).length == 0)
        {
          let large = $('#div_lg_width').val();
          let tablet = $('#div_md_width').val();
          let mobile = $('#div_xs_width').val();
          $('#'+target_container).append('<div id="'+name+'" data-lg="'+large+'" data-md="'+tablet+'" data-xs="'+mobile+'"\
          class="col-lg-'+large+' col-md-'+tablet+' col-xs-'+mobile+'" \
          >'+name+'</div>');
          $('#'+name).css({"display" : "inline-block"});
          div_outer_buttons();
        }
        else
        {
          alert('pojemnik o takiej nazwie już istnieje!');
        }
        
      });      
      
      
      
    }
    else
    {
      alert('proszę najpierw stworzyć szablon strony');
    }
  }

}


function div_outer_buttons()
{
  $('#div_inner').remove();
  $('#div_outer').remove();
  $('.focus').removeClass('focus');
  target($(main_container).find('.active_element').attr('id'));
}
