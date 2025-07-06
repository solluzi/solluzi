$(document).ready(function () {

    const insertRoute = new Insert();
    const updateRoute = new Update()

    $.validator.setDefaults({
        submitHandler: function () {

            const id = $('#inputId').val()
            const data = {
                key: 'phpmailer',
                type: 'I',
                data: {
                    from: $('#inputFrom').val(),
                    name: 'Solluzi',
                    reply_recipient: $('#inputFrom').val(),
                    reply_name: 'Solluzi',
                    authenticate: $('#inputAuthenticate').val(),
                    host: $('#inputHost').val(),
                    port: $('#inputPort').val(),
                    username: $('#inputUsername').val(),
                    password: $('#inputPassword').val(),
                    support: $('#inputSupport').val(),
                    terms: $('#inputTerms').val(),
                    message_type: true
                }
            }

            if (id) {
                updateRoute.execute(form.postType, urls.insert + id, data, form.dataType, form.contentJson, form.noCache, form.processData).then();
            } else {
                insertRoute.execute(form.postType, urls.insert + id, data, form.dataType, form.contentJson, form.noCache, form.processData).then();
            }

        }
    });

    $('#mailer-form').validate({
        rules: {
            from: {
                required: true,
                email: true,
            },
            authenticate: {
                required: true
            },
            host: {
                required: true,
                minlength: 10
            },
            port: {
                required: true,
                minlength: 2,
            },
            username: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8
            },
            support: {
                required: true,
                email: true
            },
            terms: {
                required: true,
                minlength: 255
            },
        },

        messages: {
            from: {
                required: "Por favor informe o e-mail de envio",
                email: "Informe um endereço de e-mail valido"
            },
            authenticate: {
                required: "Responda se deve autenticar...",
            },
            host: {
                required: "Informe o host da sua provedora",
                minlength: "O host deve ter no minimo 5 caracteres!"
            },
            port: {
                required: "Informe a porta SMTP da sua provedora",
                minlength: "A porta deve conter dois digitos no minimo!"
            },
            username: {
                required: "Informe o usuário de email a ser usado",
                email: "Deve informar um endereço de e-mail valido"
            },
            password: {
                required: "Informe a senha do seu e-mail",
                minlength: "A sua senha deve conter no minimo 6 caracteres"
            },
            support: {
                required: "Informe um endereço de e-mail para suporte",
                minlength: "Você deve informar um endereço de e-mail valido!"
            },
            terms: {
                required: "Informe os termos",
                minlength: "Seus termos e politicas devem ter pelo menos 255 caracteres"
            }
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });
})