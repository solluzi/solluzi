$(function () {
  var dataTable = $('#tag-list').DataTable({
    'processing': true,
    'serverSide': true,
    "searching": false,
    "paging": true,
    "responsive": true,
    "lengthChange": false,
    "autoWidth": false,
    'serverMethod': 'post',
    'ajax': {
      'url': urls.list,
      'data': function (data) {
        var description = $('#inputDescriptionSearch').val();
        // Append to data
        data.description = description;
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
      }
    ],
    'columns': [
      {
        data: 'id',
        orderable: false,
        render: function (data, type, row) {
          return '<div class="btn-group">' +
            '  <button type="button" class="btn btn-sm btn-default btn-flat"><i class="fas fa-th icon-blue"></i>&nbsp;</button>' +
            '  <button type="button" class="btn btn-sm btn-default btn-flat dropdown-toggle dropdown-icon" data-toggle="dropdown">' +
            '    <span class="sr-only">Toggle Dropdown</span>' +
            '  </button>' +
            '  <div class="dropdown-menu" role="menu">' +
            '    <a class="dropdown-item tag-edit" id="' + row.id + '" href="javascript:;"><i class="far fa-edit icon-blue"></i>&nbsp;Editar</a>' +
            '    <a class="dropdown-item tag-delete" id="' + row.id + '" href="javascript:;"><i class="far fa-trash-alt icon-red"></i>&nbsp;Excluir</a>' +
            '  </div>' +
            '</div>';
        }
      },
      { data: 'description', orderable: false },
      { data: 'created_by', orderable: false },
      { data: 'created_at', orderable: false },
      { data: 'updated_by', orderable: false },
      { data: 'updated_at', orderable: false },
    ],
    "language": {
      "url": "/assets/js/functions/pt-BR.json"
    }
  });

  $('#searchByTag').click(function () {
    dataTable.draw();
  });

  const insertRoute = new Insert();
  const updateRoute = new Update();
  const editRoute   = new Edit();
  const deleteRoute = new Delete();

  $.validator.setDefaults({
    submitHandler: function () {
      const id = $('#inputId').val()
      const data = {
        title: $('#inputTitle').val(),
        meta_title: $('#inputMetaTitle').val(),
        slug: $('#inputSlug').val(),
        description: $('#inputDescription').val(),
      };

      if (id) {
        updateRoute.execute(form.putType, urls.default + id, data, form.dataTypeJson, form.contentJson, form.noCache, form.processData).then((data) => {
          dataTable.draw();
        }).catch((error) => {
          console.log(error)
        });
      } else {
        insertRoute.execute(form.postType, urls.insert, data, form.dataTypeJson, form.contentJson, form.noCache, form.processData).then((data) => {
          dataTable.draw();
          $('#inputId').val('')
          $('#inputTitle').val('')
          $('#inputMetaTitle').val('')
          $('#inputSlug').val('')
          $('#inputDescription').val('')
        });
      }
    }
  });

  $('#tag-form').validate({
    rules: {
      description: {
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

  $('body').on('click', 'a.tag-edit', function () {
    const id = $(this).attr('id')
    editRoute.execute(urls.default + id, form.dataType).then((data) => {
      const screenSize = new ScreenSize();
      openRightToLeftNav('tag-form', screenSize.screen)
      $('#inputId').val(data.id)
      $('#inputTitle').val(data.title)
      $('#inputMetaTitle').val(data.meta_title)
      $('#inputSlug').val(data.slug)
      $('#inputDescription').val(data.description)
    }).catch()
  });

  $('body').on('click', 'a.tag-delete', function () {
    const id = $(this).attr('id')

    Swal.fire({
      title: 'Tem certeza?',
      text: "Não será possivel reverter!",
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Exclua!',
      cancelButtonText: 'Mudei de ideia'
    }).then((result) => {

      if (result.isConfirmed) {
        deleteRoute.execute(urls.default + id, form.dataType).then(() => {
          Swal.fire({
            title: 'Excluido!',
            text: 'Seu registro foi excluido.',
            icon: 'info',
            allowOutsideClick: false
          })
          dataTable.draw();
        }).catch(() => {
          Swal.fire({
            title: 'Opss!',
            text: 'Seu registro não foi excluido. Procure o seu administrador!',
            icon: 'error',
            allowOutsideClick: false
          })
        });
      }

    })
  });

});