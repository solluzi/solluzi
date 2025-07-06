$(function () {
    $('#inputPersonType').change(function () {
        const pessoaTipo = $(this).find("option:selected").text();
        
        if (pessoaTipo === 'Física') {
            $('#inputCnpj').inputmask('999.999.999-99', { 'placeholder': 'xxx.xxx.xxx-xx' })
            $("label[for*='inputIe']").html("RG");
            $("label[for*='inputIm']").html("Data de Nascimento");
            $('#inputIm').inputmask('99/99/9999', { 'placeholder': 'dd/mm/yyyy' })
        } else {
            $('#inputCnpj').inputmask('99.999.999/9999-99', { 'placeholder': 'xx.xxx.xxx/xxxx-xx' })
            $("label[for*='inputIe']").html("I.E.");
            $("label[for*='inputIm']").html("I.M.");
            $('#inputIm').inputmask('remove');
        }
    });

    getPersonType();
    getRoles();
    getGroups();
    const deleteRoute = new Delete();

    $('#inputRoles').select2()
    $('.select2bs4').select2({
        theme: 'bootstrap4'
    })

    $('[data-mask]').inputmask()

    $('#inputZipcode').inputmask('99999-999', { 
        'placeholder': 'xxxxx-xxx' 
    })

    $('#inputZipcode').keyup(function () {
        const zipcode = $(this).val();
        getAddress(zipcode.replace(/\D/g, ""));
    });

    $(".fileUpload").change(readURL);
    $("form").on('click', '.delbtn', function(e){
        let id = $('#inputId').val();
        if(id !== undefined && id !== ''){
            Swal.fire({
                title: 'Tem certeza?',
                text: "Você vai excluir a imagem!",
                icon: 'warning',
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, pode excluir!',
                cancelButtonText: 'Mudei de ideia'
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteRoute.execute(urls.default + 'picture/'+id, form.dataType).then(() => {
                    Swal.fire({
                      title: 'Excluido!',
                      text: 'Imagem excluida com sucesso.',
                      icon: 'info',
                      allowOutsideClick: false
                    })
                    reset($(this));
                  }).catch(() => {
                    Swal.fire({
                      title: 'Opss!',
                      text: 'A imagem não pode ser excluida!',
                      icon: 'error',
                      allowOutsideClick: false
                    })
                  });
                }
              })
        }else {
            reset($(this));
        }   
    })

    $(".portimg").click(function () {
        $(".fileUpload").trigger('click');
    });
})