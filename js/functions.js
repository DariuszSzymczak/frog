//----------------------------------------------------------------------------------------------------------
//------------------------------------------------content------------------------------------------------------

//function to target elements to edit and light them with border
function target_element_mouse()
{
    if( $('.table_outer:visible').length == 0)
    {
        
        id = $(this).attr('id');
        if($('.focus').length == 0) target(id);
        parent_id = $(this).parent().attr('id');
        $('#content div  *:not(.plus_button)').off();
    }
}

//set target container and active it 
function target(string1)
{
  target_container = string1;
  $('#content *').find('.active_element').removeClass('active_element');
  $('#'+string1).addClass('active_element'); 
  setTimeout(function(){right_menu_show(string1)},1000);
}




//add a node to target_container
function add_element_to_target(parent_id,id,type,nr,action)
{   
    const target_text = $('#'+target_container).html();
    if( target_text == "edytuj mnie") $('#'+target_container).html("");
    let count = count_created_elements(parent_id,type) + 1 ;
    if( nr >= 0) count = nr;
    const item = '<'+type+' id="'+parent_id+'_'+id+count+'" data-nr="'+count+'" data-action="'+action+'" ></'+type+'>';
    if ($('#'+target_container+'_plus_button').length == 1) $('#'+target_container+'_plus_button').before(item);
    else $('#'+target_container).append(item);
    target(parent_id+'_'+id+count);
    return parent_id+'_'+id+count;
}

function remove_element(id)
{
    target($('#'+id).parent().attr('id'));
    $('#'+id).remove();
}

//count all created elements in target_container, even if they were removed! 
function count_created_elements(parent_id,type)
{
    let count = 0;
    $('#'+parent_id+' '+type).each(function()
    {
        if(count <= parseInt( $(this).attr('data-nr') ) ) count = parseInt( $(this).attr('data-nr') );
    });
    return count;
}

//----------------------------------------------------------------------------------------------------------
//------------------------------------------------LEFT MENU------------------------------------------------------

//create only if other windows are closed
function check_to_create(parent_id,action)
{
    if($('#'+parent_id).parent().find('.table_outer:visible').length == 0)
    {
    action();
    }
}

//add plugin button to menu
function add_button_to_menu(id,name,button_action)
{
    $(left_menu).append('<button id="'+id+'" class="deactive" data-active=0 ><h4>'+name+'</h4></button>');
    $('#'+id).append('<img id="'+id+'_arrow"src="img/arrow.png" class="arrow"/>');   
    const arrow_id = id+'_arrow'; 

    function animate_arrow()
    {
        if ( $('#'+id).hasClass('deactive') == false ) $('#'+arrow_id).css({'opacity':'1'});
        if($('#'+id).hasClass('focus') == true ) $('#'+arrow_id).addClass('rotated');
    }
    $('#'+id).on('click',function()
    {

       if( $('#'+id).hasClass('deactive') == false ) button_action();  
       else alert('proszę najpierw stworzyć szablon strony');
    });
    
    $('#'+id).on('cssClassChanged',animate_arrow);
}

function create_cancel_button(parent_id)
{
    $('#'+parent_id+'_outer').append('<button id="'+parent_id+'_cancel" class="cancel_button">anuluj</button>');
    $('#'+parent_id+'_cancel').on('click',function()
            {
                $('#'+parent_id+'_inner').remove();
                $('#'+parent_id+'_outer').remove();
                $('.focus').removeClass('focus');
                $('#'+parent_id+'_outer').css({'margin-left':'13%'});
            });
}

//function to create box for clicked button
function create_box(parent_id,content_id,ok_action,delete_action)
{
    let table_inner = '<div id="'+parent_id+'_inner"></div>';
    let table_outer ='<span id="'+parent_id+'_outer" class="table_outer"> \
    <button id="'+parent_id+'_delete" class="delete_button">X</button> <button id="'+parent_id+'_ok" class="ok_button" >OK</button></span>';


    if($('#'+parent_id).parent().find('.table_outer:visible').length == 0)
    {
        if($('#'+parent_id).hasClass('deactive')== false)
        {
            $('.focus').removeClass('focus');
            $('#'+parent_id).addClass('focus'); 
            $('#'+parent_id).trigger('cssClassChanged');   
            $('#'+parent_id).after(table_inner + table_outer);
            if ($.isFunction(delete_action)) $('#'+parent_id+'_delete').on('click',delete_action);
            if ($.isFunction(ok_action)) $('#'+parent_id+'_ok').on('click',ok_action);
            
            $('#'+parent_id+'_delete').on('click',function()
            {
                $('#'+parent_id+'_inner').remove();
                $('#'+parent_id+'_outer').remove();
                $('.focus').removeClass('focus');
                if(content_id != "") remove_element(content_id);
                $('.rotated').removeClass('rotated');
            });
            
            $('#'+parent_id+'_ok').on('click',function()
            {
                $('#'+parent_id+'_inner').remove();
                $('#'+parent_id+'_outer').remove();
                $('.focus').removeClass('focus');
                $('.rotated').removeClass('rotated');                
            });
            return  parent_id+'_inner';         

        }
        else
        {
            alert('proszę najpierw stworzyć szablon strony');
        }
        
    }
    

}


function create_plus_button(parent_id,action,other_class)
{
    let other = "";
    if (other_class) other = other_class;
    let plus_button = `<button id="${parent_id}_plus_button${other}" class="plus_button">+</button>`;
    $('#'+parent_id).append(plus_button);
    $('#'+parent_id+'_plus_button').on('click',action);
    return parent_id+'_plus_button';   
}

function create_header(parent_id,type,action,text,nr)
{
    let number = count_created_elements(parent_id,type) + 1 ;
    if(nr >= 0 ) number = nr;
    let header = '<'+type+' data-nr="'+number+'"   id="'+parent_id+'_'+type+'_'+number+'">'+text+number+'</'+type+'>';
    $('#'+parent_id).append(header);
    $('#'+parent_id+'_'+type+'_'+number).on('click',action);
    return parent_id+'_'+type+'_'+number;
}



//---------------------------------------------------------------------------------------------------------------
//------------------------------------------------RIGHT MENU------------------------------------------------------

// box with tools to edit or remove active element
function right_menu_show(target)
{
    const type1 = $('#'+target).attr('data-action')

    if ( typeof type1  !== typeof undefined && type1 != false && type1 != "undefined" && $('.table_outer:visible').length == 0 ) 
    {
      $(right_menu).css({'height' : 'auto', 'padding': '3vw 0'});
    }
    else
    {
        $(right_menu).css({'height' : '0vh', 'padding': '0'}); 
    }
}


function right_menu_delete()
{
    const parent = $('#'+target_container).parent().attr('id');
    $('#'+target_container).remove();
    target(parent);
}

function right_menu_edit()
{
    const id = $('#'+target_container).attr('id');
    const action1 = $('#'+target_container).attr('data-action');
    let run = window[action1];
    run();
}