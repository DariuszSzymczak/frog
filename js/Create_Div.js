$(document).ready(function()
{
  add_button_to_menu('div_button','stwórz pojemnik',Create_div);
  
});

function Create_div()
{
  let tip = '<h3>szerokość całej strony to 12</h3>';
  let inputs1 =  '<input type="text" id="div_name" name="div_name"  placeholder="nazwa pojemnika"></input> \
  <label for="lg_width">Szerokość ( desktop ) : </label> <input id="div_lg_width" name="div_lg_width" type="number" min="1"  value="1" max="12"  ></input></br> \
  <label for="md_width">Szerokość ( tablet ) : </label> <input id="div_md_width" name="div_md_width" type="number" min="1" value="1" max="12"   ></br> \
  <label for="xs_width">Szerokość ( mobile ) : </label> <input id="div_xs_width" name="div_xs_width" type="number" min="1" value="1" max="12"   ></br>';
  let div_box = create_box('div_button',"",div_accept);
  $('#'+div_box).append(tip+inputs1);


  function div_accept()
  {
    let name = $('#div_name').val();
    let name_count =parseInt( $('#'+target_container+'_'+name).length );
    if( name_count != 0) name += name_count;
    else name_count = "";    
    let large = $('#div_lg_width').val();
    let tablet = $('#div_md_width').val();
    let mobile = $('#div_xs_width').val();
    let div = '#' + add_element_to_target(target_container,name+name_count,'div',name_count,'edit_div');
    $(div).attr('data-lg',large);
    $(div).attr('data-md',tablet);
    $(div).attr('data-xs',mobile);
    $(div).attr('name',name);
    $(div).addClass('col-lg-'+large+' col-md-'+tablet+' col-xs-'+mobile);
    $(div).css({"display" : "inline-block"});
    $(div).text(name);    
  };      

}

function edit_div()
{
  const div_name = target_container;
  const lg = $('#'+div_name).attr('data-lg');
  const md = $('#'+div_name).attr('data-md');
  const xs = $('#'+div_name).attr('data-xs');
  const name = $('#'+div_name).attr('name');
  let tip = '<h3>szerokość całej strony to 12</h3>';
  let inputs1 =  '<input type="text" id="div_name" name="div_name" placeholder="podaj nazwe" value="'+name+'"></input> \
  <label for="lg_width">Szerokość ( desktop ) : </label> <input id="div_lg_width" name="div_lg_width" type="number" min="1"  value="'+lg+'" max="12"></input></br> \
  <label for="md_width">Szerokość ( tablet ) : </label> <input id="div_md_width" name="div_md_width" type="number" min="1" value="'+md+'" max="12"></br> \
  <label for="xs_width">Szerokość ( mobile ) : </label> <input id="div_xs_width" name="div_xs_width" type="number" min="1" value="'+xs+'" max="12"></br>';
  let div_box = create_box('div_button','',div_accept);
  $('#'+div_box).append(tip+inputs1); 
  create_cancel_button(div_box);
  console.log('here2: '+$('#'+target_container).parent().attr('id'));
  function div_accept()
  {
    let name = $('#div_name').val();
    let name_count =parseInt( $('#'+target_container+'_'+name).length );
    if( name_count != 0) name += name_count;
    else name_count = "";    
    let large = $('#div_lg_width').val();
    let tablet = $('#div_md_width').val();
    let mobile = $('#div_xs_width').val();
    console.log('here3: '+$('#'+target_container).parent().attr('id'));
    let data = $('#'+target_container).html();

    let parent_id = $('#'+target_container).parent().attr('id');
    let div = '#' + add_element_to_target(parent_id,name+name_count,'div',name_count,'edit_div');
    if ( data == $('#'+div_name).attr('name')) $(div).html(name+name_count);
    else $(div).html(data);  
    $(div).insertBefore($(div).parent());
    $('#'+div_name).remove();
    $(div).attr('data-lg',large);
    $(div).attr('data-md',tablet);
    $(div).attr('data-xs',mobile);
    $(div).attr('name',name+name_count);
    $(div).addClass('col-lg-'+large+' col-md-'+tablet+' col-xs-'+mobile);
    $(div).css({"display" : "inline-block"});
       
  };    
}
