$(document).ready(function()
{
  add_button_to_menu('img_button','dodaj obrazek',Create_img);
  
});

function Create_img()
{
  let inputs1 =  '<input type="text" id="img_name" name="img_name" placeholder="nazwa obrazka"></input> \
  <input type="text" id="img_url" name="img_url" placeholder="adres obrazka"></input>';
  let img_box = create_box('img_button',"",img_accept);
  $('#'+img_box).append(inputs1);


  function img_accept()
  {
    const name = $('#img_name').val();
    const url = $('#img_url').val();
    let name_count =parseInt( $('#'+target_container+'_'+name).length );
    if( name_count != 0) name += name_count;
    else name_count = "";    
    let img = '#' + add_element_to_target(target_container,name+name_count,'img',name_count,'edit_img');
    $(img).attr('data-name',name);
    $(img).css({"display" : "inline-block"});
    $(img).attr('src',url);
  };      

}

function edit_img()
{
  const img_name = $('#'+target_container).attr('data-name');
  const url = $('#'+target_container).attr('src');
  let inputs1 =  '<input type="text" id="img_name" name="img_name" placeholder="nazwa obrazka" value="'+img_name+'"></input> \
  <input type="text" id="img_url" name="img_url" placeholder="adres obrazka" value="'+url+'"></input>';
  let img_box = create_box('img_button',"",img_accept);
  $('#'+img_box).append(inputs1);
  
  function img_accept()
  {
    const name = $('#img_name').val();
    const url = $('#img_url').val();
    let name_count =parseInt( $('#'+target_container+'_'+name).length );
    if( name_count != 0) name += name_count;
    else name_count = "";
    let parent_id = $('#'+target_container).parent().attr('id');
    let img = '#' + add_element_to_target(parent_id,name+name_count,'img',name_count,'edit_img');
    $(img).attr('src',url);
    $(img).insertBefore('#'+img_name);
    $('#'+img_name).remove();
    $(img).css({"display" : "inline-block"});
  };    
}
