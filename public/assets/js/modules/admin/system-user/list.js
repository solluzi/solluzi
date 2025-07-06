$(function () {
  
  var dataTable = $('#user-list').DataTable({
    'processing': true,
    'serverSide': true,
    "searching": false,
    "paging": true,
    "responsive": true,
    'serverMethod': form.postType,
    "lengthChange": false,
    "autoWidth": false,
    'ajax': {
      'url': urls.list,
      'data': function (data) {
        var name = $('#inputNameSearch').val();
        var email = $('#inputEmailSearch').val();
        var active = $('#inputActiveSearch').val();
        var type  = 'Física';
        // Append to data
        data.name = name;
        data.email = email;
        data.active = active;
        data.type   = type;
      },
      dataFilter: function (data) {
        var json = jQuery.parseJSON(data);

        json.recordsTotal = json.recordsTotal;
        json.recordsFiltered = json.recordsFiltered;
        json.data = json.data;

        return JSON.stringify(json); // return JSON string
      }
    },
    "columnDefs": [
      {
        "width": "8%",
        "targets": 0,
        "className": "dt-body-center"
      },
      {
        "width": "8%",
        "targets": 4,
        "className": "dt-center"
      },
    ],
    'columns': [
      {
        data: 'id',
        orderable: false,
        render: function (data, type, row) {
          return '' +
            '    <a class="p-edit" id="' + row.id + '" href="javascript:;"><i class="far fa-edit icon-blue"></i>&nbsp;</a>' +
            '    <a class="p-delete" id="' + row.id + '" href="javascript:;"><i class="far fa-trash-alt icon-red"></i>&nbsp;</a>' +
            '    <a class="p-status" id="' + row.id + '" href="javascript:;"><i class="fa fa-power-off icon-orange"></i>&nbsp;</a>' +
            '';
        }
      },
      { data: 'name', orderable: false },
      { data: 'login', orderable: false },
      { data: 'email', orderable: false },
      { data: 'active', orderable: false,
        render: function(data, type, row) {
          if(row.active == true){
            return '<span class="badge badge-success rounded-0">Sim</span>';
          } else {
            return '<span class="badge badge-danger rounded-0">Não</span>';
          }          
        }
      },
    ],
    "language": {
      "url": "/assets/js/functions/pt-BR.json"
    }
  });

  $('#search').click(function () {
    dataTable.draw();
  });

  const insertRoute = new Insert();
  const updateRoute = new Update();
  const editRoute = new Edit();
  const deleteRoute = new Delete();

  $.validator.setDefaults({
    submitHandler: function () {
      insertPerson = new FormData();


      const id = $('#inputId').val()
      const data = {
        person: $('#inputPerson').val(),
        username: $('#inputUsername').val(),
      }; 

      if (id) {
        updateRoute.execute(form.putType, urls.default + id, data, form.dataTypeJson, form.noContentType, form.noCache, form.processData).then((data) => {
          dataTable.draw();
        }).catch((error) => {
          console.log(error)
        });
      } else {
        insertRoute.execute(form.postType, urls.insert, data, form.dataTypeJson, form.noContentType, form.noCache, form.processData).then((data) => {
          dataTable.draw();
          $('#inputId').val('')
          $('#inputPerson').val('').change();
          $('#inputUsername').val('');
        });
      }
    }
  });

  $('#user-form').validate({
    rules: {
      inputPerson: {
        required: true,
        minlength: 1,
      },
      inputUsername: {
        required: true,
        minlength: 5,
      }
    },

    messages: {
      inputPerson: {
        required: "Por favor informe o nome o usuário",
      },
      inputPinputUsernameerson: {
        required: "Por favor informe o nome o usuário",
        minlength: "Minimo de 5 caracteres!"
      }
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    }
  });


  $('body').on('click', 'a.p-edit', function () {
    const id = $(this).attr('id')
    editRoute.execute(urls.default + id, form.dataType).then((data) => {
      const screenSize = new ScreenSize();
      openRightToLeftNav('pc-form', screenSize.screen)
      $('#inputId').val(data.id)
      $('#inputPerson').val(data.person).change();
      $('#inputUsername').val(data.username);
      
    }).catch()

  });

  $('body').on('click', 'a.p-status', function () {
    const id = $(this).attr('id')

    Swal.fire({
      title: 'Tem certeza?',
      text: "Você vai alterar o Status da pessoa!",
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Mude o status!',
      cancelButtonText: 'Mudei de ideia'
    }).then((result) => {
      if (result.isConfirmed) {
        editRoute.execute(urls.status + id, form.dataType).then(() => {
          Swal.fire({
            title: 'Alterado!',
            text: 'O Status deste usuário foi alterado.',
            icon: 'info',
            allowOutsideClick: false
          })
          dataTable.draw();
        }).catch(() => {
          Swal.fire({
            title: 'Opss!',
            text: 'O Status não foi alterado. Procure o seu administrador!',
            icon: 'error',
            allowOutsideClick: false
          })
        });
      }
    })
  });


  $('body').on('click', 'a.p-delete', function () {
    const id = $(this).attr('id')

    Swal.fire({
      title: 'Tem certeza?',
      text: "Você vai excluir este usuário!",
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!',
      cancelButtonText: 'Mudei de ideia'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRoute.execute(urls.default + id, form.dataType).then(() => {
          Swal.fire({
            title: 'Excluido!',
            text: 'O usuário foi excluido!.',
            icon: 'info',
            allowOutsideClick: false
          })
          dataTable.draw();
        }).catch(() => {
          Swal.fire({
            title: 'Opss!',
            text: 'O usuário não foi excluido. Procure o seu administrador!',
            icon: 'error',
            allowOutsideClick: false
          })
        });
      }
    })
  });
});