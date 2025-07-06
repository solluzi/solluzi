class Delete {
    execute(url, type) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "DELETE",
                url: url,
                dataType: type,
                success: function (response) {
                    resolve(response)
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    reject(jqXHR, textStatus, errorThrown)
                }

            })
        })
    }
}