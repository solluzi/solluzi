class Update {
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
                        title: 'Atualizado!',
                        text: 'Informações gravadas com sucesso.',
                        icon: 'success',
                        allowOutsideClick: false,
                    }).then((result) => {
                        resolve(response);
                    })

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    reject(jqXHR, textStatus, errorThrown)
                }

            })
        })
    }
}