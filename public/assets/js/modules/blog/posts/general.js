$(function () {
  $('#inputTitle').keyup(function(e){
    let result = slugify($(this).val());
    $('#inputSlug').val(result);
  })
  $('#inputTags').select2()
  $('.select2bs4').select2({
    theme: 'bootstrap4'
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

  $(".cover").click(function () {
    $(".fileUpload").trigger('click');
  });
})