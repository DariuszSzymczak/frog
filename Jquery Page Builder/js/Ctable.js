$(document).ready(function () {
    add_button_to_menu('table_button', 'stwórz tabele', Ctable);
});


function Ctable() {
    let table_inner = '<div id="table_inner"><button id="tr_button" class="plus_button">+</button></div>';
    let table_outer = '<span id="table_outer" class="table_outer"   ><button id="table_cancel" class="cancel_button">X</button><button id="table_ok" class="ok_button" >OK</button></span>';
    create_box();

    if ($('.table_outer:visible').length == 0) {
        if ($('#table_button').hasClass('deactive') == false) {
            $('.focus').removeClass('focus');
            $(this).addClass('focus');
            $('#table_button').after(table_inner + table_outer);
            $('#table_cancel').on('click', cancel_create);
            $('#table_ok').on('click', accept_create);
            $('#tr_button').on('click', Ctr);
            var act = $('#table_button').attr('data-active');
            var number = $(main_container + ' table').length;
            var table_id = 'table' + number;
            var tab = $('<table class="table" id="' + table_id + '"></table>');
            $('#' + target_container).append(tab);
            target(table_id);
            $('#table_button').attr('data-active', 1);
        }
        else {
            alert('proszę najpierw stworzyć szablon strony');
        }
    }

}

function Ctr() {

    $('#tr_button').remove();
    let tr_outer = '<span id="tr_outer" class="table_outer"  ><button id="tr_cancel" class="cancel_button">X</button><button id="tr_ok" class="ok_button" >OK</button></span>';
    let tr_number = 0;
    $('#' + target_container + ' tr').each(function () {
        let id = $(this).attr('id').match(/tr(\d*)/);
        if (parseInt(id[1]) >= tr_number) tr_number = parseInt(id[1]) + 1;
        console.log("ciulsko: " + id[1]);
    });
    let tr_id = target_container + '_tr' + tr_number;
    $('#' + target_container).append('<tr id="' + tr_id + '"> </tr>');
    let header = '<h1 data-nr="' + tr_number + '" id="h1_tr' + tr_number + '">  Wiersz nr ' + tr_number + '</h1>';
    let td_button = '<button id="td_button" class="plus_button">+</button>';
    let tr_inner = '<div id="tr_inner" >' + td_button + '</div>';
    $('#table_inner').append(header + tr_inner + tr_outer);
    $('h1').removeClass('focus');
    $('#h1_tr' + tr_number).addClass('focus');
    $('#tr_ok').on('click', accept_tr);
    $('#tr_cancel').on('click', cancel_tr);
    $('#td_button').on('click', Ctd);
    target(tr_id);
    $('#h1_tr' + tr_number).on('click', show_tr);

}

function Ctd() {
    $('#td_button').remove();
    let td_number = 0;
    $('#' + target_container + ' td, #' + target_container + ' th').each(function () {
        let id = $(this).attr('id').match(/(td|th)(\d*)/);
        if (parseInt(id[2]) >= td_number) td_number = parseInt(id[2]) + 1;

    });
    let td_id = target_container + '_td' + td_number;
    let header = '<h2 data-nr=' + td_number + ' id="h2_td' + td_number + '" >Element nr' + td_number + '</h2>';
    let inputs1 = '<label for="td_width">Szerokość ( rowspan ) : </label> <input id="td_width" type="number" min="1" name="td_width" value="1" ></input></br> \
  <label for="td_heigth">Wysokość ( colspan ) : </label> <input id="td_heigth" name="td_heigth" type="number" min="1" value="1"  ></br>';
    let inputs2 = '<p>TD: <input type="radio" name="td_type" value="TD" checked ></input> TH: <input type="radio" name="td_type" value="TH"></input></p>';
    let td_inner = '<div id="td_inner">' + inputs1 + inputs2 + '</div>';
    let td_outer = '<span id="td_outer" class="table_outer"><button id="td_cancel" class="cancel_button">X</button><button id="td_ok" class="ok_button" >OK</button></span>';
    $('#tr_inner').append(header + td_inner + td_outer);
    $('h2').removeClass('focus');
    $('#h2_td' + td_number).addClass('focus');
    $('#h2_td' + td_number).on('click', show_td);
    $('#td_cancel').on('click', cancel_td);
    $('#td_ok').on('click', function () {
        let w = $('#td_width').val();
        let h = $('#td_heigth').val();
        let type = $('input:checked[name="td_type"]').val();
        console.log('#' + target_container);
        $('#' + target_container).append('<' + type + ' id="' + td_id + '" colspan="' + w + '" rowspan="' + h + '" >' + td_id + '</' + type + '>');
        $('#td_inner').remove();
        $('#td_outer').remove();
        $('#tr_inner').append('<button id="td_button" class="plus_button">+</button>');
        $('#td_button').on('click', Ctd);
    });


}

function cancel_create() {
    target($(main_container + ' table').last().parent().attr('id'));
    $(main_container + ' table').last().remove();
    $('#table_inner').remove();
    $('#table_outer').remove();
    $('#table_button').attr('data-active', 0);
    $('.focus').removeClass('focus');

}

function accept_create() {
    $('#table_inner').remove();
    $('#table_outer').remove();
    $('#table_button').attr('data-active', 0);
    $('.focus').removeClass('focus');
    target($(main_container).find('.active_element').attr('id'));
}

function accept_tr() {
    let parent_container = $('#' + target_container).parent().attr('id');
    target(parent_container);
    $('#table_inner').append('<button id="tr_button" class="plus_button">+</button>');
    $('#tr_button').on('click', Ctr);
    $('#tr_button').show();
    $('#tr_inner').remove();
    $('#tr_outer').remove();

}

function cancel_tr() {
    let parent_container = $('#' + target_container).parent().attr('id');
    console.log('usuwam ' + target_container + ' , parent: ' + parent_container);
    $('#' + target_container).remove();
    $(this).parent().prev().prev().remove();
    $('#table_inner').append('<button id="tr_button" class="plus_button">+</button>');
    $('#tr_button').on('click', Ctr);
    $('#tr_button').show();
    $('#tr_inner').remove();
    $('#tr_outer').remove();
    target(parent_container);
}

function cancel_td() {
    $('#td_inner').remove();
    $('#td_outer').remove();
    $('#tr_inner h2').last().remove();
    $('#tr_inner').append('<button id="td_button" class="plus_button">+</button>');
    $('#td_button').on('click', Ctd);
}

function show_tr() {
    if ($('#tr_inner').length == '0') {
        $('#tr_button').remove();
        let table = $(main_container + ' table').last().attr('id');
        let tr = $(this).attr('data-nr');
        let tr_id = '#' + table + '_tr' + tr;
        let td_list = $(tr_id + ' td');
        target(table + '_tr' + tr);
        console.log(td_list.length);
        let tr_outer = '<span id="tr_outer" class="table_outer"  ><button id="tr_cancel" class="cancel_button">X</button><button id="tr_ok" class="ok_button" >OK</button></span>';
        let td_button = '<button id="td_button" class="plus_button">+</button>';
        let tr_inner = '<div id="tr_inner" ></div>';
        $(this).after(tr_inner + tr_outer);
        $('h1').removeClass('focus');
        $(this).addClass('focus');
        for (let td_number = 0; td_number < td_list.length; td_number++) {
            $('#tr_inner').append('<h2 data-nr=' + td_number + ' id="h2_td' + td_number + '">Element nr' + td_number + '</h2>');
            $('#h2_td' + td_number).on('click', show_td);
        }
        $('#tr_inner').append(td_button);
        $('#td_button').on('click', Ctd);
        $('#tr_button').on('click', Ctr);
        $('#tr_cancel').on('click', cancel_tr);
        $('#tr_ok').on('click', accept_tr);
    }
}

function show_td() {
    if ($('#td_inner').length == '0') {
        $('#td_button').remove();
        let td_id = target_container + '_td' + $(this).attr('data-nr');
        console.log('target:' + target_container + 'nodename: ' + $('#' + td_id).prop('tagName'));
        let input1_val = $('#' + td_id).attr('colspan');
        let input2_val = $('#' + td_id).attr('rowspan');
        let inputs1 = '<label for="td_width">Szerokość ( rowspan ) : </label> <input id="td_width" type="number" min="1" name="td_width" value="' + input1_val + '"></input></br> \
    <label for="td_heigth">Wysokość ( colspan ) : </label> <input id="td_heigth" name="td_heigth" type="number" min="1" value="' + input2_val + '" ></br>';
        let inputs2 = '<p>TD: <input type="radio" name="td_type" value="TD" checked> TH: <input type="radio" name="td_type" value="TH"></p>';
        let td_inner = '<div id="td_inner">' + inputs1 + inputs2 + '</div>';
        let td_outer = '<span id="td_outer" class="table_outer"><button id="td_cancel" class="cancel_button">X</button><button id="td_ok" class="ok_button" >OK</button></span>';
        $(this).after(td_inner + td_outer);
        $('h2').removeClass('focus');
        $(this).addClass('focus');
        $('input:radio[name="td_type"]').filter('input:radio[value="' + $('#' + td_id).prop('tagName') + '"]').prop('checked', true);

        $('#td_ok').on('click', function () {
            let w = $('#td_width').val();
            let h = $('#td_heigth').val();
            let type = $('input:checked[name="td_type"]').val();
            $('#' + td_id).replaceWith('<' + type + ' id="' + td_id + '" colspan="' + w + '" rowspan="' + h + '" >' + td_id + '</' + type + '>');
            $('#td_inner').remove();
            $('#td_outer').remove();
            $('#tr_inner').append('<button id="td_button" class="plus_button">+</button>');
            $('#td_button').on('click', Ctd);

        });

        $('#td_cancel').on('click', function () {
            cancel_td();
            $('#' + td_id).remove();
        });

    }
}
