$(function () {
    $('#open-tag-form').click(function () {
        const screenSize = new ScreenSize();
        openRightToLeftNav('tag-form', screenSize.screen)
        $('#tag-form').trigger('reset');
        $('#inputTitle').val('');
        $('#inputMetaTitle').val('');
        $('#inputSlug').val('');
        $('#inputDescription').val('');
        $('#inputId').val('');
    });

    $('.closecurtainbtn').click(function () {
        closeRightToLeftNav('tag-form');
        $('#tag-form').trigger('reset');
        $('#inputTitle').val('');
        $('#inputMetaTitle').val('');
        $('#inputSlug').val('');
        $('#inputDescription').val('');
        $('#inputId').val('');
    });

    $('#inputTitle').keyup(function(e){
        let result = slugify($(this).val());
        $('#inputSlug').val(result);
    })

    
})