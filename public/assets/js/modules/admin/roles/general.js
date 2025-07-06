$(function () {
    $('#open-role-form').click(function () {
        const screenSize = new ScreenSize();
        openRightToLeftNav('rc-form', screenSize.screen)
        $('#role-form').trigger('reset');
        $('#inputId').val('')
    });

    $('.closecurtainbtn').click(function () {
        closeRightToLeftNav('rc-form');
        $('#role-form').trigger('reset');
    });

    
})