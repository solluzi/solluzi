$(function () {
  var dataTable = $('#person-list').DataTable({
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
        var cnpj_cpf = $('#inputCpfCnpjSearch').val();
        var nome_fantasia = $('#inputNomeFantasiaSearch').val();
        var email = $('#inputEmailSearch').val();
        // Append to data
        data.cnpj_cpf = cnpj_cpf;
        data.nome_fantasia = nome_fantasia;
        data.email = email;
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
        "className": "text-center"
      },
      {
        "targets": 1,
        "className": "text-right"
      },
      {
        "targets": 3,
        "className": "text-right"
      },
      {
        "targets": 6,
        "className": "text-right"
      }
    ],
    'columns': [
      {
        data: 'id',
        orderable: false,
        render: function (data, type, row) {
          return '' +
            '    <a class="p-edit" id="' + row.id + '" href="javascript:;"><i class="far fa-edit icon-blue"></i>&nbsp;</a>' +
            '    <a class="p-view" id="' + row.id + '" href="javascript:;"><i class="far fa-user-circle icon-gray"></i>&nbsp;</a>' +
            '    <a class="p-status" id="' + row.id + '" href="javascript:;"><i class="fa fa-power-off icon-orange"></i>&nbsp;</a>' +
            '';
        }
      },
      { data: 'cpf_cnpj', orderable: false },
      { data: 'firstname', orderable: false },
      { data: 'phones', orderable: false },
      { data: 'email', orderable: false },
      { data: 'groups', orderable: false },
      { data: 'created_at', orderable: false },
      { data: 'updated_at', orderable: false },
    ],
    "language": {
      "url": "/assets/js/functions/pt-BR.json"
    }
  });

  $('#searchByPType').click(function () {
    dataTable.draw();
  });

  $('#inputCpfCnpjSearch').inputmask({
    mask: ['999.999.999-99', '99.999.999/9999-99'],
    keepStatic: true
  })

  const insertRoute = new Insert();
  const updateRoute = new Update();
  const editRoute = new Edit();
  const deleteRoute = new Delete();

  $.validator.setDefaults({
    submitHandler: function () {
      insertPerson = new FormData();


      const id = $('#inputId').val()
      const data = new FormData($('#person-form').get(0));
      /* const data = {
        type: $('#inputPersonType').val(),
        picture: $('#inputPicture').val(),
        cpf_cnpj: $('#inputCnpj').val(),
        firstname: $('#inputFirstname').val(),
        lastname: $('#inputLastname').val(),
        groups: $('#inputGroup').val(),
        ie_rg: $('#inputIe').val(),
        im: $('#inputIm').val(),
        phones: $('#inputPhones').val(),
        email: $('#inputEmail').val(),
        zipcode: $('#inputZipcode').val(),
        address: $('#inputAddress').val(),
        number: $('#inputNumber').val(),
        complement: $('#inputComplement').val(),
        neighborhood: $('#inputNeighborhood').val(),
        state: $('#inputState').val(),
        city: $('#inputCity').val(),
        observation: $('#inputObservation').val(),
        roles: $('#inputRoles').val(),
      }; */

      if (id) {
        insertRoute.execute(form.postType, urls.default + id, data, form.dataTypeJson, form.noContentType, form.noCache, form.noProcessData).then((data) => {
          dataTable.draw();
        }).catch((error) => {
          console.log(error)
        });
      } else {
        insertRoute.execute(form.postType, urls.insert, data, form.dataTypeJson, form.noContentType, form.noCache, form.noProcessData).then((data) => {
          dataTable.draw();
          $('#inputId').val('')
          $('#inputPersonType').val('');
          $('#inputPicture').val('');
          $('#inputCnpj').val('');
          $('#inputFirstname').val('');
          $('#inputLastname').val('');
          $('#inputGroup').val('');
          $('#inputIe').val('');
          $('#inputIm').val('');
          $('#inputPhones').val('');
          $('#inputEmail').val('');
          $('#inputZipcode').val('');
          $('#inputAddress').val('');
          $('#inputNumber').val('');
          $('#inputComplement').val('');
          $('#inputNeighborhood').val('');
          $('#inputState').val('');
          $('#inputCity').val('');
          $('#inputObservation').val('');
          $('#inputRoles').val('').change();
        });
      }
    }
  });

  $('#person-form').validate({
    rules: {
      type: {
        required: true,
        minlength: 1,
      },
      cpf_cnpj: {
        required: true,
        minlength: 11,
      },
      firstname: {
        required: true,
        minlength: 1,
      },
      lastname: {
        required: true,
        minlength: 1,
      },
      roles: {
        required: true,
        minlength: 1,
      },
      group: {
        required: true,
        minlength: 1,
      },
      phones: {
        required: true,
        minlength: 12,
      },
      email: {
        required: true,
        email: true,
      },
      zipcode: {
        required: true,
        minlength: 9,
      },
      address: {
        required: true,
        minlength: 2,
      },
      number: {
        required: true,
        minlength: 2,
      },
      neighborhood: {
        required: true,
        minlength: 2,
      },
      state: {
        required: true,
        minlength: 2,
      },
      city: {
        required: true,
        minlength: 2,
      }
    },

    messages: {
      description: {
        required: "Por favor informe o nome do tipo de pessoa",
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
      $('#inputPersonType').val(data.type);
      $('#inputPicture').val();
      $('#inputCnpj').val(data.cpf_cnpj);
      $('#inputFirstname').val(data.firstname);
      $('#inputLastname').val(data.lastname);
      $('#inputGroup').val(data.groups);
      $('#inputIe').val(data.ie_rg);
      $('#inputIm').val(data.im);
      $('#inputPhones').val(data.phones);
      $('#inputEmail').val(data.email);
      $('#inputZipcode').val(data.zipcode);
      $('#inputAddress').val(data.address);
      $('#inputNumber').val(data.number);
      $('#inputComplement').val(data.complement);
      $('#inputNeighborhood').val(data.neighborhood);
      $('#inputState').val(data.state);
      $('#inputCity').val(data.city);
      $('#inputObservation').val(data.observation);

      if (data.picture !== undefined && data.picture !== '' && data.picture !== null) {
        $('.portimg').attr('src', window.location.origin + '/assets/' + data.picture)
        $('.delbtn').remove();
        $('.socialmediaside2').append('<button type="button" class="btn btn-warning delbtn removebtn" value="Excluir"><i class="fa fa-trash red"></i> &nbsp Excluir Imagem</button>');
      }
      const roles = JSON.parse(data.roles)
      $('#inputRoles').val(roles).change();
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
        deleteRoute.execute(urls.default + id, form.dataType).then(() => {
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

});