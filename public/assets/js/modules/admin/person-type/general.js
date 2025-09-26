$(function () {
    $('#open-pt-form').click(function () {
        const screenSize = new ScreenSize();
        openRightToLeftNav('person-type-form', screenSize.screen)
        $('#ptype-form').trigger('reset');
    });

    $('.closecurtainbtn').click(function () {
        closeRightToLeftNav('person-type-form');
        $('#ptype-form').trigger('reset');
    });

    
})