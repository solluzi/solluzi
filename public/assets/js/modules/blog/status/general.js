$(function () {
    $('#open-st-form').click(function () {
        const screenSize = new ScreenSize();
        openRightToLeftNav('st-form', screenSize.screen)
        $('#st-form').trigger('reset');
        $('#inputDescription').val('');
        $('#inputId').val('');
    });

    $('.closecurtainbtn').click(function () {
        closeRightToLeftNav('st-form');
        $('#st-form').trigger('reset');
    });

    
})