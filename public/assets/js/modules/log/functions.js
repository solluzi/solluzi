function refreshSelectBox() {
    const searchRoute = new Search();
    $("#inputParent").empty();
    searchRoute.execute(urls.all, form.dataTypeJson).then((data) => {
        $.each(data, function (index, item) {
            $("#inputParent").append("<option value='" + item.id + "'>" + item.name + "</option>");
        })

    }).catch((error) => {
        console.log(error)
    })
}