$(function () {
    $('#open-person-form').click(function () {
        const screenSize = new ScreenSize();
        openRightToLeftNav('pc-form', screenSize.screen)
        $('#person-form').trigger('reset');
        $('#inputId').val('');
        $('#inputRoles').val('').change();
        $('.portimg').attr('src',  window.location.origin + '/assets/img/default/empty-image.webp');
        $('.delbtn').remove();
    });

    $('.closecurtainbtn').click(function () {
        closeRightToLeftNav('pc-form');
        $('#person-form').trigger('reset');
        $('#inputRoles').val('').change();
    });    
})