$(function () {
    /* Close PHP Mailer Form Curtain */
    $('.closecurtainbtn').click(function () {
        closeRightToLeftNav('navigation-form');
        $('#tree-form').trigger("reset");
        $('#inputId').val()
    });

    refreshSelectBox();
});

