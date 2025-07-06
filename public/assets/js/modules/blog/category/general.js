$(function () {
    /* Close PHP Mailer Form Curtain */
    $('.closecurtainbtn').click(function () {
        closeRightToLeftNav('navigation-form');
        $('#tree-form').trigger("reset");
        $('#inputId').val()
    });

    $('#inputTitle').keyup(function(e){
        console.log('ola')
        let slug = slugify($(this).val());
        $('#inputSlug').val(slug)
    })

    refreshSelectBox();
});

