var css_class_styles_array = [{}];

//open left menu with css edit containers
$('#right_menu_style').on('click', function () {
    $(left_menu + ' *').not('#css_menu, #css_menu *').addClass('hide');
    $('#css_menu').show();
});

//action to choose edit css type
$('#css_menu_element').on('click', function () {
    $('#css_menu_element_input').show();
    $('#css_menu_class_input').hide();
    css_edit_table();
});

$('#css_menu_class').on('click', function () {
    $('#css_menu_class_input').show();
    $('#css_menu_element_input').hide();
    css_edit_table("classmode");
});

// function to create css box in left menu
function css_edit_table(arg) {

    var table_start = '<table  id="css_menu_table"></table>';

    // generate left_menu box for class editor
    if (arg == "classmode") {
        $('#css_menu_element_input').html('');
        const css_input_name = '</br><h3>Wpisz nazwę Klasy</h3><input type="text" id="css_input_name"></input>';
        $('#css_menu_class_input').html(css_input_name + table_start);
        css_add_tr();
        create_plus_button('css_menu_class_input', function(){            
            css_table_string();        
            css_add_tr();
        });

        $('#css_table_button_save').on('click',css_class_save_style);

    //generate left_menu editor for element
    } else {
        $('#css_menu_class_input').html('');
        $('#css_menu_element_input').html(table_start);
        css_element_styles();

        create_plus_button('css_menu_element_input',function(){
           css_table_string();       
           css_add_tr(); 
        });

        $('#css_table_button_save').on('click',css_save_style);
    }

    // create boxes in left_menu to add some <tr> in the css table
    function css_add_tr(text) {
        if(!text) text='';
        let count_tr = $('#css_menu_table tr').length;
        if ($('#css_table_button_save').length == 0) $('#css_menu_table').append('<tr id="css_table_save"><td colspan="2"><button id="css_table_button_save" class="menu_long_button">Zapisz Styl</button></td></tr>');
        $('#css_table_save').before(`<tr data-nr=${count_tr}>\
        <td data-type="value"><input type="text" placeholder="atrybut : wartość" value='${text}'></input></td><td class="css_menu_delete">\
        <img src="img/x.png"/ class="css_menu_img"></td></tr>`);
        $(`.css_menu_delete`).on('click', css_delete_tr);
        
    }

    //delete <tr>
    function css_delete_tr() {
        $(this).parent().remove();
    }

    function css_table_string() {
        var values = [];
        const regex = /([a-z]*:[a-z]*)/;

        $('#css_menu_table').find('input').each(function () {

            if (regex.test($(this).val())) {                
                values.push($(this).val());
                $(this).css({'background':'#fff'});
            }
            else{
                $(this).css({'background':'#ff6666'});
            }
        });
       return values;
    }

    function css_element_styles(){
        let styles;
        if(css_class_styles_array[target_container]){
            styles = css_class_styles_array[target_container].style;
            for(let x=0;x<styles.length;x++){
                css_add_tr(styles[x]);
            }
        }
        else{
            css_class_styles_array[target_container]={
                style:'',
                classes:[]
            }
            if($('#'+target_container).attr('style')){
                
                styles = $('#'+target_container).attr('style').split(';');
                for(let x=0;x<styles.length;x++){
                    css_add_tr(styles[x]);
                }
                css_class_styles_array[target_container].style = styles;
            }
            else css_add_tr();
        }
    }

    function css_class_styles(){

        if(!(css_class_styles_array[target_container])){
            css_class_styles_array[target_container]={
                style:'',
                classes:[]
            }
        let save_element_begin_style = $('#'+target_container).attr('style').split(';');
        css_class_styles_array[target_container].style = save_element_begin_style;
        }

        $('.css_menu_delete').each(function(){
            $(this).trigger('click');
        });
        var class_name = $('#css_input_name').val();
        if(css_class_styles_array[class_name] ){
            const styles = css_class_styles_array[class_name]; 
            for(let x=0;x<styles.length;x++){
                css_add_tr(styles[x]);
            } 
        } 
        else css_add_tr();        
    }

    function css_class_save_style(){
        const val = css_table_string();
        var class_name = $('#css_input_name').val();
        css_class_styles_array[class_name] = val;
        if($('#'+target_container).hasClass(class_name) == false) $('#'+target_container).addClass(class_name);

        if(find_if_has_class(class_name) == false ){
            css_class_styles_array[target_container].classes.push(class_name);
        }
        $('.'+class_name).each(function(){
            console.log('this id: '+this.id+' dodano: '+css_element_all_styles(this.id));

            $(this).attr('style',css_element_all_styles(this.id))
        
        });


        function find_if_has_class(name){
            let class_names_of_element = css_class_styles_array[target_container].classes;
            for(let x=0;x<class_names_of_element.length;x++)
            {
                if(class_names_of_element[x] == name) return true;
            }
            return false;
        }
    }

    function css_element_all_styles(id){

        var styles=css_class_styles_array[id].style;
        let class_names_of_element = css_class_styles_array[id].classes;
        for(let x=0;x<class_names_of_element.length;x++)
        {
            console.log('concatuje to: '+class_names_of_element[x]+' i watosc tego: '+css_class_styles_array[class_names_of_element[x]]);
            styles = styles.concat(css_class_styles_array[class_names_of_element[x]]);
        }
        var styles_string = styles.join(';');
        console.log('tak dziala join: '+ styles_string);
        return styles_string;
    }

    function css_save_style(){
        const val = css_table_string();
        css_class_styles_array[target_container].style = val;
        $('#'+target_container).removeAttr('style');
        $('#'+target_container).attr('style',css_element_all_styles(target_container))
    }


    

    $('#css_input_name').keyup(css_class_styles);
}
function css_exit(){
    $('#css_menu_element_input').hide();
    $('#css_menu_class_input').hide();
    $(left_menu + ' *').removeClass('hide');
    $('#css_menu').hide();   
  }
