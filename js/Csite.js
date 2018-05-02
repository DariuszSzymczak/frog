$(document).ready(function(){
$(left_menu).append('<button id="site_button" data-active=0 >szablon strony</button>');
$('#site_button').on('click',Csite);
});


function Csite(){
  target_container = main_container;
  if($('#site_button').attr('data-active') == 0)
  {
    if($('.row').length == 0)
    {
      let site_inner = '<div id="site_inner"><button id="row_button" class="plus_button">+</button></div>';
      let site_outer ='<span id="site_outer" class="table_outer"  ><button id="site_cancel" class="cancel_button">X</button><button id="site_ok" class="ok_button" >OK</button></span>';
      $('#site_button').after(site_inner + site_outer);
      $('#site_cancel').on('click',site_cancel_create);
      $('#site_ok').on('click',site_accept_create);
      $('#row_button').on('click',Crow);
      $('#site_button').attr('data-active',1);
    }
    else
    {
      $('#site_inner, #site_outer').show();      

    }
    $('.focus').removeClass('focus');
    $('#site_button').addClass('focus');
  }

}

function Crow(){
  $('#row_button').remove();
  let row_outer ='<span id="row_outer" class="table_outer"  ><button id="row_cancel" class="cancel_button">X</button><button id="row_ok" class="ok_button" >OK</button></span>';
  var row_number =0;
  $('#'+target_container+' .row').each(function(){
    let id = parseInt( $(this).attr('id').match(/\d+/) ); 
    if(id >= row_number) row_number = id+1;
   });
  let row_id = target_container+'_row'+row_number;
  $('#'+target_container).append('<div id="'+row_id+'" class="row"> </div>');
  let header = '<h1 data-nr="'+row_number+'" id="h1_row'+row_number+'">  Wiersz nr '+row_number+'</h1>';
  let col_button= '<button id="col_button" class="plus_button">+</button>';
  let row_inner= '<div id="row_inner" >'+col_button+'</div>' ;
  $('#site_inner').append(header+row_inner+row_outer);
  $('h1').removeClass('focus');
  $('#h1_row'+row_number).addClass('focus');
  $('#row_ok').on('click',accept_row);
  $('#row_cancel').on('click',cancel_row);
  $('#col_button').on('click',Ccol);
  target_container = row_id;
  Ccol();
  $('#h1_row'+row_number).on('click',show_row);
  
}

function Ccol(){

  let col_number =0;

  $('#'+target_container+' div').each(function(){
    let id =  $(this).attr('id').match(/col(\d*)/)  ;    
     if(parseInt(id[1]) >= col_number) col_number = parseInt(id[1])+1;
   });

  $('#col_button').remove();
  $('#row_outer').hide();

  let tip = '<h3>szerokość całej strony to 12</h3>';
  let col_id = target_container+'_col'+col_number;
  let header = '<h2 data-nr='+col_number+' id="h2_col'+col_number+'" >Element nr'+col_number+'</h2>';
  let inputs1 =  '<label for="lg_width">Szerokość ( desktop ) : </label> <input id="lg_width" name="lg_width" type="number" min="1"  max="12" value="1" ></input></br> \
  <label for="md_width">Szerokość ( tablet ) : </label> <input id="md_width" name="md_width" type="number" min="1" value="1" max="12"   ></br> \
  <label for="xs_width">Szerokość ( mobile ) : </label> <input id="xs_width" name="xs_width" type="number" min="1" value="1" max="12"   ></br>';
  let col_inner = '<div id="col_inner">'+tip+inputs1+'</div>';
  let col_outer ='<span id="col_outer" class="table_outer"><button id="col_cancel" class="cancel_button">X</button><button id="col_ok" class="ok_button" >OK</button></span>';
  $('#row_inner').append(header+col_inner+col_outer);
  $('#h2_col'+col_number).on('click',show_col);
  $('h2').removeClass('focus');
  $('#h2_col'+col_number).addClass('focus');
  $('#col_cancel').on('click',function(){
    cancel_col();
    $('#row_inner h2').last().remove();
  });

  $('#col_ok').on('click',function(){
    let large = $('#lg_width').val();
    let tablet = $('#md_width').val();
    let mobile = $('#xs_width').val();
    $('#'+target_container).append('<div id="'+col_id+'" data-lg="'+large+'" data-md="'+tablet+'" data-xs="'+mobile+'"\
     class="col-lg-'+large+' col-md-'+tablet+' col-xs-'+mobile+'" \
     ></div>');
     $('#'+col_id).append('<button id="'+col_id+'_plus_button" class="active_col_button plus_button">+</div>');
     $('#'+col_id+'_plus_button').on('click',function(){
       if( $('.table_outer:visible').length == 0) setTimeout(target(col_id),500);
        $('#blur2').fadeIn();
        $('*').one('mouseup',function(){$('#blur2').fadeOut();})
    });
    $('#col_inner').remove();
    $('#col_outer').remove();
    $('#row_outer').show();
    $('#row_inner').append('<button id="col_button" class="plus_button">+</button>');
    $('#col_button').on('click',Ccol);
   
  });
}

function site_cancel_create(){
  $('.row').remove();
  $('#site_inner').remove();
  $('#site_outer').remove();
  $('#site_button').attr('data-active',0);
  $('.focus').removeClass('focus');

}
function site_accept_create(){
  if ($('#col_ok').length != 0 ) $('#col_ok').click();
  if ($('#row_ok').length != 0 ) $('#row_ok').click();
  $('#site_inner, #site_outer').hide();
  $('#site_button').attr('data-active',0);
  if($('.row').length > 0) {
    $(left_menu+' button').removeClass('deactive');
    $('#content_buttons').css({display:'block'}).animate({right:'0vw'},200);
  }
  if($('.row').length == 0){
    $('#content_buttons').animate({right:'-50vw'},200).css({display:'none'});
    $(left_menu+' button').not('#site_button').addClass('deactive');
  } 
  $(left_menu+' button').trigger('cssClassChanged');
  $('.focus').removeClass('focus');
  target($('#content div div').first().attr('id'));
}
function accept_row(){
  target_container = 'content';
 $('#site_inner').append('<button id="row_button" class="plus_button">+</button>');
 $('#row_button').on('click',Crow);
  $('#row_button').show();
  $('#row_inner').remove();
  $('#row_outer').remove();
}

function cancel_row(){  
  $('#'+target_container).remove();
  $(this).parent().prev().prev().remove();
  $('#site_inner').append('<button id="row_button" class="plus_button">+</button>');
  $('#row_button').on('click',Crow);
  $('#row_button').show();
  $('#row_inner').remove();
  $('#row_outer').remove();
  target_container = 'content';
}
function cancel_col(){
  $('#col_inner').remove();
  $('#col_outer').remove();  
  $('#row_inner').append('<button id="col_button" class="plus_button">+</button>');
  $('#col_button').on('click',Ccol);
  $('#row_outer').show();

}
function show_row(){
  if($('#row_inner').length == '0'){
    $('#row_button').remove();
    let row = $(this).attr('data-nr');
    let row_id = '#'+target_container+'_row'+row;
    let col_list = $(row_id+' div');
    target_container =target_container+'_row'+row;
    let row_outer ='<span id="row_outer" class="table_outer"  ><button id="row_cancel" class="cancel_button">X</button><button id="row_ok" class="ok_button" >OK</button></span>';
    let col_button= '<button id="col_button" class="plus_button">+</button>';
    let row_inner= '<div id="row_inner" ></div>' ;
    $(this).after(row_inner+row_outer);
    $('h1').removeClass('focus');
    $(this).addClass('focus');
    for(let col_number=0;col_number<col_list.length;col_number++)
    {
      $('#row_inner').append('<h2 data-nr='+col_number+' id="h2_col'+col_number+'">Element nr'+col_number+'</h2>');
      $('#h2_col'+col_number).on('click',show_col);
    }
   $('#row_inner').append(col_button);
   $('#col_button').on('click',Ccol);
   $('#row_button').on('click',Crow);
   $('#row_cancel').on('click',cancel_row);
   $('#row_ok').on('click',accept_row);
  }
}

function show_col()
{
  if($('#col_inner').length == '0')
  {
    $('#col_button').remove();
    $('#row_outer').hide();
    h2_nr=$(this).attr('data-nr');
    let col_id = target_container+'_col'+$(this).attr('data-nr');
    let input1_val = $('#'+col_id).attr('data-lg');
    let input2_val = $('#'+col_id).attr('data-md');
    let input3_val = $('#'+col_id).attr('data-xs');
    let data = $('#'+col_id).html();
    let inputs1 =  '<label for="lg_width">Szerokość ( desktop ) : </label> <input id="lg_width" name="lg_width" type="number" min="1"  value="'+input1_val+'" ></input></br> \
     <label for="md_width">Szerokość ( tablet ) : </label> <input id="md_width" name="md_width" type="number" min="1" value="'+input2_val+'"  ></br> \
     <label for="xs_width">Szerokość ( mobile ) : </label> <input id="xs_width" name="xs_width" type="number" min="1" value="'+input3_val+'"  ></br>';
  let col_inner = '<div id="col_inner">'+inputs1+'</div>';
  let col_outer ='<span id="col_outer" class="table_outer"><button id="col_cancel" class="cancel_button">X</button><button id="col_ok" class="ok_button" >OK</button></span>';
    $(this).after(col_inner+col_outer);
    $('h2').removeClass('focus');
    $(this).addClass('focus');
    $('#col_ok').on('click',function(){
      let lg = $('#lg_width').val();
      let md = $('#md_width').val();
      let xs = $('#xs_width').val();
      $('#'+col_id).replaceWith('<div id="'+col_id+'" data-lg="'+lg+'" data-md="'+md+'" data-xs="'+xs+'"\
      class="col-lg-'+lg+' col-md-'+md+' col-xs-'+xs+'" \
      >'+data+'</div>');
      $('#'+col_id+'_plus_button').on('click',function(){if( $('.table_outer:visible').length == 0) setTimeout(target(col_id),500)});
     $('#col_inner').remove();
     $('#col_outer').remove();
     $('#row_inner').append('<button id="col_button" class="plus_button">+</button>');
     $('#col_button').on('click',Ccol);

    });

    $('#col_cancel').on('click',function(){
      $('#'+col_id).remove();
      $('#h2_col'+h2_nr).remove();      
      cancel_col();
          
    });

  }
}
