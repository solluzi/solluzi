$(function () {
    const insertRoute = new Insert();
    const updateRoute = new Update();

    $.validator.setDefaults({
        submitHandler: function () {
            const id = $('#inputId').val()
            const data = {
                parent: $('#inputParent').val(),
                name: $('#inputTreeNome').val(),
                text: $('#inputTreeText').val(),
                uri_name: $('#inputTreeUrl').val(),
                class_namespace: $('#inputTreeNamespace').val(),
            };

            if (id) {
                updateRoute.execute(form.putType, urls.default + id, data, form.dataTypeJson, form.contentJson, form.noCache, form.processData).then((data) => {
                    $('#jstree_menu').jstree(true).refresh();
                    refreshSelectBox();
                });
            } else {
                insertRoute.execute(form.postType, urls.insert, data, form.dataTypeJson, form.contentJson, form.noCache, form.processData).then((data) => {
                    $('#jstree_menu').jstree(true).refresh();
                    refreshSelectBox();
                    $('#inputId').val('')
                });
            }


        }
    });

    $('#tree-form').validate({
        rules: {
            parent: {
                required: true,
            },
            name: {
                required: true,
                minlength: 2,
            },
            text: {
                required: true,
                minlength: 2
            },
            url: {
                required: true,
                minlength: 10
            }
        },

        messages: {
            parent: {
                required: "Por favor informe o nó Pai",
            },
            name: {
                required: "Por favor informe o nome",
                minlength: "O nome deve ter o minimo de 2 caracteres"
            },
            text: {
                required: "Por favor informe o nome para a arvore",
                minlength: "O nome deve ter o minimo de 2 caracteres"
            },
            url: {
                required: "Por favor informe a url para a rota",
                minlength: "O host deve ter no minimo 10 caracteres!"
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