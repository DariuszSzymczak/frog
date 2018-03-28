$(document).ready(function()
{
  add_button_to_menu('table2_button','tabela framework',create_table);
});


function create_table()
{  
  let table_id = add_element_to_target(target_container,'table','table');
  let main_box = create_box('table2_button',table_id);
  create_plus_button(main_box,function(){create_tr(main_box,table_id)});
}

function create_tr(parent_id,table_id)
{
  let row_id = add_element_to_target(target_container,'tr','tr');  
  let header = create_header(parent_id,'h1',show_tr,'wiersz nr ');

  function accept_tr()
  {
    create_plus_button(parent_id,function(){create_tr(parent_id,table_id)});
    target(table_id);
  }

  function cancel_tr()
  {
    create_plus_button(parent_id,function(){create_tr(parent_id,table_id)});
    $('#'+header).remove();
  }

  let row_box = create_box(header,row_id,accept_tr,cancel_tr);
  let button = create_plus_button(row_box,function(){create_td(row_box,row_id)});
  console.log('row_box_plus: '+button);
  $('#'+parent_id+"_plus_button").remove();
  console.log('row_box: '+row_box);
}


function create_td(parent_id,row_id)
{
  $('#'+parent_id+"_plus_button").remove(); 
  let inputs1 =  '<label for="td_width">Szerokość ( rowspan ) : </label> <input id="td_width" type="number" min="1" name="td_width" value="1" ></input></br> \
  <label for="td_heigth">Wysokość ( colspan ) : </label> <input id="td_heigth" name="td_heigth" type="number" min="1" value="1"  ></br>';
  let inputs2 = '<p>TD: <input type="radio" name="td_type" value="TD" checked ></input> TH: <input type="radio" name="td_type" value="TH"></input></p>';
  let header = create_header(parent_id,'h2',show_td,'komórka nr ');
  let td_box = create_box(header,"",td_accept,td_cancel);
  $('#'+td_box).append(inputs1+inputs2);
  console.log('td_box: '+td_box);

  function td_accept()
  {
    let w = $('#td_width').val();
    let h = $('#td_heigth').val();
    let type = $('input:checked[name="td_type"]').val();
    let element = add_element_to_target(row_id,type,type);
    $('#'+element).attr('rowspan',w);
    $('#'+element).attr('colspan',h);
    $('#'+element).html('edytuj mnie');
    create_plus_button(parent_id,function(){create_td(parent_id,row_id)});
    target(row_id);
  }

  function td_cancel()
  {
    create_plus_button(parent_id,function(){create_td(parent_id,row_id)});
    $('#'+header).remove();
  }
  
}

function show_tr()
{
  let this_id = $(this).attr('id');
  let parent_id =$(this).parent().attr('id');  
  let this_nr = $(this).attr('data-nr');
  let row_id = $('#'+target_container).find('tr[data-nr="'+this_nr+'"]').attr('id');
  let table_id = $('#'+row_id).parent().attr('id');
  console.log('tablea: '+table_id);
  target(row_id);
  let row_box = create_box(this_id,row_id,accept_tr,cancel_tr);

  let elements = $('#'+row_id+' th,#'+row_id+' td').each(function()
  {
    let type = $(this).prop('tagName');
    let nr = $(this).attr('data-nr');
    create_header(row_box,'h2',show_td,type,nr);
  });

  $('#'+parent_id+"_plus_button").remove();
  let button = create_plus_button(row_box,function(){create_td(row_box,row_id)});
  
  function accept_tr()
  {
    create_plus_button(parent_id,function(){create_tr(parent_id,table_id)});
    target(table_id);
  }

  function cancel_tr()
  {
    create_plus_button(parent_id,function(){create_tr(parent_id,table_id)});
    $('#'+this_id).remove();
  }

}


function show_tr2(){
  if($('#tr_inner').length == '0'){
    $('#tr_button').remove();
    let table = $(main_container+' table').last().attr('id');
    let tr = $(this).attr('data-nr');
    let tr_id = '#'+table+'_tr'+tr;
    let td_list = $(tr_id+' td');
    target(table+'_tr'+tr);
    console.log(td_list.length);
    let tr_outer ='<span id="tr_outer" class="table_outer"  ><button id="tr_cancel" class="cancel_button">X</button><button \
     id="tr_ok" class="ok_button" >OK</button></span>';
    let td_button= '<button id="td_button" class="plus_button">+</button>';
    let tr_inner= '<div id="tr_inner" ></div>' ;
    $(this).after(tr_inner+tr_outer);
    $('h1').removeClass('focus');
    $(this).addClass('focus');
    for(let td_number=0;td_number<td_list.length;td_number++)
    {
      $('#tr_inner').append('<h2 data-nr='+td_number+' id="h2_td'+td_number+'">Element nr'+td_number+'</h2>');
      $('#h2_td'+td_number).on('click',show_td);
    }
   $('#tr_inner').append(td_button);
   $('#td_button').on('click',Ctd);
   $('#tr_button').on('click',Ctr);
   $('#tr_cancel').on('click',cancel_tr);
   $('#tr_ok').on('click',accept_tr);
  }
}

function show_td()
{
  if($('#td_inner').length == '0')
  {
    $('#td_button').remove();
    let td_id = target_container+'_td'+$(this).attr('data-nr');
    console.log('target:'+target_container+'nodename: '+$('#'+td_id).prop('tagName'));
    let input1_val = $('#'+td_id).attr('colspan');
    let input2_val = $('#'+td_id).attr('rowspan');
    let inputs1 = '<label for="td_width">Szerokość ( rowspan ) : </label> <input id="td_width" type="number" min="1" name="td_width" value="'+input1_val+'"></input></br> \
    <label for="td_heigth">Wysokość ( colspan ) : </label> <input id="td_heigth" name="td_heigth" type="number" min="1" value="'+input2_val+'" ></br>';
    let inputs2 = '<p>TD: <input type="radio" name="td_type" value="TD" checked> TH: <input type="radio" name="td_type" value="TH"></p>';
    let td_inner = '<div id="td_inner">'+inputs1+inputs2+'</div>';
    let td_outer ='<span id="td_outer" class="table_outer"><button id="td_cancel" class="cancel_button">X</button><button id="td_ok" class="ok_button" >OK</button></span>';
    $(this).after(td_inner+td_outer);
    $('h2').removeClass('focus');
    $(this).addClass('focus');
    $('input:radio[name="td_type"]').filter('input:radio[value="'+$('#'+td_id).prop('tagName')+'"]').prop('checked',true);

    $('#td_ok').on('click',function(){
      let w = $('#td_width').val();
      let h = $('#td_heigth').val();
      let type = $('input:checked[name="td_type"]').val();
      $('#'+td_id).replaceWith('<'+type+' id="'+td_id+'" colspan="'+w+'" rowspan="'+h+'" >'+td_id+'</'+type+'>');
      $('#td_inner').remove();
      $('#td_outer').remove();
      $('#tr_inner').append('<button id="td_button" class="plus_button">+</button>');
      $('#td_button').on('click',Ctd);

    });

    $('#td_cancel').on('click',function(){
      cancel_td();
      $('#'+td_id).remove();
    });

  }
}
