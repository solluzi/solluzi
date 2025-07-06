class Edit {
    execute(url, type) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: url,
                dataType: type,
                success: function (response) {
                    resolve(response);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    reject(jqXHR, textStatus, errorThrown)
                }
            })
        })
    }

}