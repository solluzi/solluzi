$(function () {
  var dataTable = $('#sql-list').DataTable({
    'processing': true,
    'serverSide': true,
    "searching": false,
    "paging": true,
    "responsive": true,
    "lengthChange": false,
    "autoWidth": false,
    'serverMethod': 'post',
    'ajax': {
      'url': urls.sql,
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
      { data: 'data'      , orderable: false},
      { data: 'login'     , orderable: false },
      { data: 'database'  , orderable: false },
      { data: 'command'   , orderable: false },
      { data: 'program'   , orderable: false },
      { data: 'sapi'      , orderable: false },
      { data: 'ip_address', orderable: false },
    ],
    "language": {
      "url": "/assets/js/functions/pt-BR.json"
    }
  });

  $('#searchByTag').click(function () {
    dataTable.draw();
  });

  const deleteRoute = new Delete();

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