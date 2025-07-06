$(function () {
  var dataTable = $('#access-list').DataTable({
    'processing': true,
    'serverSide': true,
    "searching": false,
    "paging": true,
    "responsive": true,
    "lengthChange": false,
    "autoWidth": false,
    'serverMethod': 'post',
    'ajax': {
      'url': urls.access,
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
            '    <a class="dropdown-item article-edits" id="' + row.id + '" href="/blog/articles/edit/'+row.id+'"><i class="far fa-edit icon-blue"></i>&nbsp;Editar</a>' +
            '    <a class="dropdown-item article-delete" id="' + row.id + '" href="javascript:;"><i class="far fa-trash-alt icon-red"></i>&nbsp;Excluir</a>' +
            '    <a class="dropdown-item article-status" id="' + row.id + '" href="javascript:;"><i class="fa fa-power-off icon-orange"></i>&nbsp;Status</a>' +
            '  </div>' +
            '</div>';
        }
      },
      { data: 'title', orderable: false },
      { data: 'created_by', orderable: false },
      { data: 'updated_by', orderable: false },
      { data: 'ip_address', orderable: false },
    ],
    "language": {
      "url": "/assets/js/functions/pt-BR.json"
    }
  });

  $('#searchByTag').click(function () {
    dataTable.draw();
  });


});