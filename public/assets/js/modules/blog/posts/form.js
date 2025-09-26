$(function () {
  const insertRoute = new Insert();
  const updateRoute = new Update();
  const editRoute = new Edit();

  getTags();
  getCategories();
  getStatus();

  setTimeout(function(){
    console.log('ola');
    $('.ck-word-count').addClass('row mt-1');
    $('.ck-word-count__words').addClass('col-sm-6');
    $('.ck-word-count__characters').addClass('col-sm-6 text-right');
  }, 1000);
  

 /*  $('#post-form').submit(function(e){
    e.preventDefault();

    let inputTitle      = $('#inputTitle').val();
    let meta_title      = $('#inputMetaTitle').val();
    let inputKeyword    = $('#inputKeyword').val();
    let inputSlug       = $('#inputSlug').val();
    let inputSummary    = $('#inputSummary').val();
    let inputArticle    = $('#inputArticle').val();
    let inputCategories = $('#inputCategories').val();
    let inputTags       = $('#inputTags').val();
    let inputStatus     = $('#inputStatus').val();


    console.log('ola');
    let content = $('#inputArticle').text();
    console.log(content);
    if($.trim(content) == ''){
      console.log('vazio')
    }
  }) */

  /* $.validator.setDefaults({
    submitHandler: function () {      
      const id = $('#inputId').val()
      const data = {
        title: $('#inputTitle').val(),
        meta_title: $('#inputMetaTitle').val(),
        slug: $('#inputSlug').val(),
        summary: $('#inputSummary').val(),
        article: $('#inputArticle').val(),
        status: $('#inputStatus').val(),
        categories: $('#inputCategories').val(),
        tags: $('#inputTags').val()
      };

      if (id) {
        updateRoute.execute(form.putType, urls.default + id, data, form.dataTypeJson, form.contentJson, form.noCache, form.processData).then((data) => {
          dataTable.draw();
        }).catch((error) => {
          console.log(error)
        });
      } else {
        insertRoute.execute(form.postType, urls.insert, data, form.dataTypeJson, form.contentJson, form.noCache, form.processData).then((data) => {

          $('#inputId').val('')
          $('#inputTitle').val('')
          $('#inputMetaTitle').val('')
          $('#inputSlug').val('')
          $('#inputDescription').val('')
        });
      }
    }
  }); */

 /*  $.validator.addMethod("ck_editor", function () {
    var content_length = editorTextarea.getData().trim().length;
    return content_length > 0;
  }, "Please insert content for the page.");

  $('#post-form').validate({
    rules: {
      input_title: {
        required: true,
        minlength: 2,
      },
      input_meta_title: {
        required: true,
        minlength: 2,
      },
      input_key_word: {
        required: true,
        minlength: 2,
      },
      input_slug: {
        required: true,
        minlength: 2,
      },
      summary: {
        required: true,
        minlength: 2,
      },
      input_article: {
        minlength: 2
      },
      input_categories: {
        required: true,
        minlength: 2,
      },
      input_tags: {
        required: true,
        minlength: 2,
      },
      input_status: {
        required: true,
        minlength: 1,
      }
    },

    messages: {
      input_article: {
        ck_editor: true
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
    },
  }); */

  let url = window.location.pathname;
  let id = url.substring(url.lastIndexOf('/') + 1);


  if ($.isNumeric(id)) {
    editRoute.execute(urls.default + id, form.dataType).then((data) => {
      $('#inputId').val(data.id)
      $('#inputTitle').val(data.title)
      $('#inputMetaTitle').val(data.meta_title)
      $('#inputSlug').val(data.slug)
      $('#inputSummary').val(data.summary);
      //$('#inputArticle').val(data.article);

      setTimeout(() => {
        let categories = JSON.parse(data.categories);
        $('#inputCategories').val(categories).change();

        let tags = JSON.parse(data.tags);
        $('#inputTags').val(tags).change();
        $('#inputStatus').val(data.status).change();
      }, 500);

      editor.data.set(data.article);
      googlePreview();

    }).catch()
  }

  editor();

  $('#inputMetaTitle').keyup(function () {
    googlePreview();
  })

})