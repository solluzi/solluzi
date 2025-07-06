$(function () {
    $('#open-group-form').click(function () {
        const screenSize = new ScreenSize();
        openRightToLeftNav('gc-form', screenSize.screen)
        $('#group-form').trigger('reset');
        $('#inputId').val('');
    });

    $('.closecurtainbtn').click(function () {
        closeRightToLeftNav('gc-form');
        $('#group-form').trigger('reset');
    });

    
})