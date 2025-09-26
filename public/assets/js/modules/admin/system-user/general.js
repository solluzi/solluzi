$(function () {
    $('#open-user-form').click(function () {
        const screenSize = new ScreenSize();
        openRightToLeftNav('pc-form', screenSize.screen)
        $('#user-form').trigger('reset');
        $('#inputId').val('');
        $('#inputRoles').val('').change();
    });

    $('.closecurtainbtn').click(function () {
        closeRightToLeftNav('pc-form');
        $('#person-form').trigger('reset');
        $('#inputRoles').val('').change();
    });    
})