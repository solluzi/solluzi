function getPersonType() {
    const personType = new Search();
    $("#inputPersonType").empty();
    $("#inputPersonType").append("<option value=''></option>");
    personType.execute(urls.personType).then((data) => {
        $.each(data, function (index, item) {
            $("#inputPersonType").append("<option value='" + item.id + "'>" + item.description + "</option>");
        })
    }).catch((error) => {
        console.log(error)
    });

}

function getRoles() {
    const roles = new Search();
    $("#inputRoles").empty();
    roles.execute(urls.roles).then((data) => {
        $.each(data, function (index, item) {
            $("#inputRoles").append("<option value='" + item.id + "'>" + item.description + "</option>");
        })
    }).catch((error) => {
        console.log(error)
    });
}

function getGroups() {
    const groups = new Search();
    $("#inputGroup").empty();
    $("#inputGroup").append("<option value=''></option>");
    groups.execute(urls.groups).then((data) => {
        $.each(data, function (index, item) {
            $("#inputGroup").append("<option value='" + item.id + "'>" + item.description + "</option>");
        })
    }).catch((error) => {
        console.log(error)
    });
}

function getAddress(zipcode) {
    const address = new Search();
    address.execute(urls.address + zipcode).then((data) => {
        if (data.logradouro) {
            $('#inputAddress').val(data.logradouro);
            $('#inputComplement').val(data.complemento);
            $('#inputNeighborhood').val(data.bairro);
            $('#inputState').val(data.uf);
            $('#inputCity').val(data.localidade);
            $('#inputNumber').focus();
        }
    }).catch((error) => {
        console.log(error)
    });
}

function readURL(){
    var $input = $(this);
    var $newinput = $(this).parent().parent().parent().find('.portimg ');
    if(this.files && this.files[0]){
        var reader = new FileReader();
        reader.onload = function(e){
            reset($newinput.next('.delbtn', true));
            $newinput.attr('src', e.target.result).show();
            $('.socialmediaside2').append('<button type="button" class="btn btn-warning delbtn removebtn" value="Excluir"><i class="fa fa-trash red"></i> &nbsp Excluir Imagem</button>');
        }
        reader.readAsDataURL(this.files[0]);
    }
}

function reset(elm, prserveFileName)
{
    if(elm && elm.length > 0){
        var $input = elm;
        $('.portimg').attr('src',  window.location.origin+'/assets/img/default/empty-image.webp');
        if(!prserveFileName){
            $($input).parent().parent().parent().find('input.fileUpload ').val("");
        }
        elm.remove();
    }
}