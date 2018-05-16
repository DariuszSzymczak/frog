$(document).ready(function()
{
  add_button_to_menu('table2_button','stwórz tabele',create_table);
});


function create_table()
{ 
  check_to_create('table2_button',function()
  {
    let table_id = add_element_to_target(target_container,'table','table',-1,'edit_table');
    $('#'+table_id).text('edytuj mnie');
    $('#'+table_id).addClass('table');
    let main_box = create_box('table2_button',table_id,accept_all);
    create_plus_button(main_box,function(){create_tr(main_box,table_id)});

    function accept_all()
    {
      $('#'+main_box).find('.ok_button').click();
    }

  });  
}



function edit_table()
{
  let reg = /.*table[0-9]*/;
  let reg_result = reg.exec(target_container);
  table_id = reg_result[0];
  let main_box = create_box('table2_button',table_id,accept_all);
  $('#'+table_id+' tr').each(function()
  {
    const nr = $(this).attr('data-nr');
    create_header(main_box,'h1',show_tr,'wiersz nr ',nr);
  });
  create_plus_button(main_box,function(){create_tr(main_box,table_id)});

  function accept_all()
  {
    $('#'+main_box).find('.ok_button').click();
  }
  target(table_id);
}

function create_tr(parent_id,table_id)
{
  let row_id = add_element_to_target(target_container,'tr','tr',-1,'edit_table');  
  target(row_id);
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
  $('#'+parent_id+"_plus_button").remove();
}


function create_td(parent_id,row_id)
{
  $('#'+parent_id+"_plus_button").remove();
  $('#'+parent_id).parent().find('.table_outer').hide(); 
  let inputs1 =  '<label for="td_width">Wysokość( rowspan ) : </label> <input id="td_width" type="number" min="1" name="td_width" value="1" ></input></br> \
  <label for="td_heigth">Szerokość ( colspan ) : </label> <input id="td_heigth" name="td_heigth" type="number" min="1" value="1"  ></br>';
  let inputs2 = '<p>TD: <input type="radio" name="td_type" value="TD" checked ></input> TH: <input type="radio" name="td_type" value="TH"></input></p>';
  let header = create_header(parent_id,'h2',show_td,'komórka nr ');
  let header_nr = $('#'+header).attr('data-nr');
  let td_box = create_box(header,"",td_accept,td_cancel);
  $('#'+td_box).append(inputs1+inputs2);
  
  function td_accept()
  {
    let w = $('#td_width').val();
    let h = $('#td_heigth').val();
    let type = $('input:checked[name="td_type"]').val();
    let element = add_element_to_target(row_id,type,type,header_nr,'edit_table');
    $('#'+element).attr('rowspan',w);
    $('#'+element).attr('colspan',h);
    $('#'+element).html('edytuj mnie');
    create_plus_button(parent_id,function(){create_td(parent_id,row_id)});
    $('#'+parent_id).parent().find('.table_outer').show(); 
    target(row_id);
  }

  function td_cancel()
  {
    $('#'+parent_id).parent().find('.table_outer').show(); 
    create_plus_button(parent_id,function(){create_td(parent_id,row_id)});
    $('#'+header).remove();
  }
  
}

function show_tr()
{
  let this_id = $(this).attr('id');
  let parent_id =$(this).parent().attr('id'); 
  $('#'+parent_id+"_plus_button").remove();
  let this_nr = $(this).attr('data-nr');
  let row_id = $('#'+target_container).find('tr[data-nr="'+this_nr+'"]').attr('id');
  let table_id = $('#'+row_id).parent().attr('id');
  target(row_id);
check_to_create(this_id,function()
  {
     
 
    let row_box = create_box(this_id,row_id,accept_tr,cancel_tr);
  
    let elements = $('#'+row_id+' th,#'+row_id+' td').each(function()
    {    
      let header = create_header(row_box,'h2',show_td,'komórka nr ');
  
    });
  
    
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
  });

}

function show_td()
{
  let this_id = $(this).attr('id');
  let parent_id =$(this).parent().attr('id');  
  let this_nr = $(this).attr('data-nr');
  let td_id = $('#'+target_container).find('*[data-nr="'+this_nr+'"]').attr('id');
  let row_id = $('#'+td_id).parent().attr('id');
  $('#'+parent_id+"_plus_button").remove(); 
  let colspan = $('#'+td_id).attr('colspan');
  let rowspan = $('#'+td_id).attr('rowspan');
  let nr = $('#'+td_id).attr('data-nr');
  let inputs1 =  '<label for="td_width">Wysokość ( rowspan ) : </label> <input id="td_width" type="number" min="1" name="td_width" value="'+colspan+'" ></input></br> \
  <label for="td_heigth">Szerokość ( colspan ) : </label> <input id="td_heigth" name="td_heigth" type="number" min="1" value="'+rowspan+'"  ></br>';
  let inputs2 = '<p>TD: <input type="radio" name="td_type" value="TD" checked ></input> TH: <input type="radio" name="td_type" value="TH"></input></p>';
  let td_box = create_box(this_id,td_id,td_accept,td_cancel);
  $('#'+td_box).append(inputs1+inputs2);
  $('input:radio[name="td_type"]').filter('input:radio[value="'+$('#'+td_id).prop('tagName')+'"]').prop('checked',true);
  function td_accept()
  {
    let w = $('#td_width').val();
    let h = $('#td_heigth').val();
    let type = $('input:checked[name="td_type"]').val();
    let text = $('#'+td_id).html();
    let action = $('#'+td_id).attr('data-action');
    $('#'+td_id).replaceWith('<'+type+' id="'+td_id+'"  data-nr="'+nr+'" colspan="'+w+'" rowspan="'+h+'" data-action="'+action+'" >'+text+'</'+type+'>');
    create_plus_button(parent_id,function(){create_td(parent_id,row_id)});
    target(row_id);
  }

  function td_cancel()
  {
    create_plus_button(parent_id,function(){create_td(parent_id,row_id)});
    $('#'+this_id).remove();
  }
}