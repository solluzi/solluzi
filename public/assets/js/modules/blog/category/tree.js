$(function () {
    const editRoute = new Edit();
    const deleteRoute = new Delete();
    $('#jstree_menu').jstree({
        'plugins': ['contextmenu'],
        'core': {
            'data': {
                "url": urls.tree,
                "plugins": [],
                "dataType": "json" // needed only if you do not supply JSON headers
            },
            'themes': {
                'name': 'proton',
                'responsive': true
            }
        },
        "contextmenu": {
            "items": function ($node) {
                var tree = $("#tree").jstree(true);
                return {
                    "Create": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Criar",
                        "action": function (obj) {
                            /* $node = tree.create_node($node);
                            tree.edit($node); */
                            const screenSize = new ScreenSize();
                            openRightToLeftNav('navigation-form', screenSize.screen)
                            $('#tree-form').trigger("reset");
                            $('#inputId').val('')
                            $('#inputParent').val($node.id);
                        }
                    },
                    "Rename": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Editar",
                        "action": function (obj) {
                            //tree.edit($node);
                            if ($node.parent == '#') {
                                Swal.fire({
                                    title: 'Proibido!',
                                    text: 'Você não pode editar este Registro.',
                                    icon: 'error',
                                    allowOutsideClick: false
                                })
                            } else {
                                const screenSize = new ScreenSize();
                                openRightToLeftNav('navigation-form', screenSize.screen)
                                editRoute.execute(urls.default + $node.id, form.dataTypeJson).then((data) => {
                                    $('#inputId').val(data.id);
                                    $('#inputParent').val(data.parent);
                                    $('#inputTitle').val(data.title);
                                    $('#inputMetaTitle').val(data.meta_title);
                                    $('#inputSlug').val(data.slug);
                                    $('#inputDescription').val(data.description);

                                })
                            }
                        }
                    },
                    "Remove": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Excluir",
                        "action": function (obj) {
                            Swal.fire({
                                title: 'Tem certeza?',
                                text: "Não será possivel reverter!",
                                icon: 'warning',
                                allowOutsideClick: false,
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Sim, Exclua!',
                                cancelButtonText: 'Mudei de ideia'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    if ($node.parent == '#') {
                                        Swal.fire({
                                            title: 'Proibido!',
                                            text: 'Você não pode excluir este Registro.',
                                            icon: 'error',
                                            allowOutsideClick: false
                                        })
                                    } else {
                                        deleteRoute.execute(urls.default + $node.id, form.dataTypeJson).then((data) => {
                                            Swal.fire({
                                                title: 'Excluido!',
                                                text: 'Seu registro foi excluido.',
                                                icon: 'info',
                                                allowOutsideClick: false
                                            })
                                            $('#jstree_menu').jstree(true).refresh();
                                            refreshSelectBox();
                                        })
                                    }
                                }
                            })
                        }
                    }
                };
            }
        }
    });
});