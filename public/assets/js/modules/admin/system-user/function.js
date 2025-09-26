function getEmail() {
    const user = new Search();
    $("#inputPerson").empty();
    $("#inputPerson").append("<option value=''></option>");
    user.execute(urls.person).then((data) => {
        $.each(data, function (index, item) {
            $("#inputPerson").append("<option value='" + item.id + "'>" + item.email + "</option>");
        })
    }).catch((error) => {
        console.log(error)
    });

}

