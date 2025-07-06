class Insert {
    execute(type, url, data, dataType, contentType, cache, processData) {

        return new Promise((resolve, reject) => {
            $.ajax({
                type: type,
                url: url,
                data: data,
                dataType: dataType,
                contentType: contentType,
                cache: cache,
                processData: processData,
                success: function (response) {
                    Swal.fire({
                        title: 'Gravado!',
                        text: 'Informações gravadas com sucesso.',
                        icon: 'success',
                        allowOutsideClick: false,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Novo Registro!',
                        cancelButtonText: 'Voltar aos registros'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $(response.form_id).trigger("reset");
                            resolve(true);
                        } else {
                            if (response.curtain) {
                                closeRightToLeftNav(response.curtain);
                            }
                            if (response.form_id) {
                                $(response.form_id).trigger("reset");
                            }
                            resolve(true);
                        }
                    })
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    reject(errorThrown)
                }

            })
        })
    }
}