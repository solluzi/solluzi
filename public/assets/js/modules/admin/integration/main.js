$(document).ready(function () {
    const editRoute = new Edit();
    /* Open PHP Mailer Form Curtain */
    $('.phpmailer').click(function () {
        const screenSize = new ScreenSize();
        openRightToLeftNav('phpmailer', screenSize.screen)
        editRoute.execute(urls.edit + 'phpmailer').then((data) => {
            if (data[0]) {
                const values = JSON.parse(data[0].value);
                
                $('#inputFrom').val(values.from);
                $('#inputAuthenticate').val(values.authenticate);
                $('#inputHost').val(values.host);
                $('#inputPort').val(values.port);
                $('#inputUsername').val(values.username);
                $('#inputPassword').val(values.password);
                $('#inputSupport').val(values.support);
                $('#inputTerms').val(values.terms);
            }

        })
    });
    /* Close PHP Mailer Form Curtain */
    $('.closecurtainbtn').click(function () {
        closeRightToLeftNav('phpmailer');
    });
})