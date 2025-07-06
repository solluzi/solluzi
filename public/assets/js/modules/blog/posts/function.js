function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    }
}

function getTags() {
    const tags = new Search();
    $("#inputTags").empty();
    tags.execute(urls.tags).then((data) => {
        $.each(data, function (index, item) {
            $("#inputTags").append("<option value='" + item.id + "'>" + item.title + "</option>");
        })
    }).catch((error) => {
        console.log(error)
    });

}

function getCategories() {
    const tags = new Search();
    $("#inputCategories").empty();
    tags.execute(urls.categories).then((data) => {
        $.each(data, function (index, item) {
            $("#inputCategories").append("<option value='" + item.id + "'>" + item.name + "</option>");
        })
    }).catch((error) => {
        console.log(error)
    });

}

function getStatus() {
    const tags = new Search();
    $("#inputStatus").empty();
    tags.execute(urls.status).then((data) => {
        $.each(data, function (index, item) {
            $("#inputStatus").append("<option value='" + item.id + "'>" + item.description + "</option>");
        })
    }).catch((error) => {
        console.log(error)
    });

}

function readURL() {
    var $input = $(this);
    var $newinput = $(this).parent().parent().parent().find('.cover');
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            reset($newinput.next('.delbtn', true));
            $newinput.attr('src', e.target.result).show();
            $('.delbtn').remove();
            $('.socialmediaside2').append('<button type="button" class="btn btn-warning delbtn removebtn" value="Excluir"><i class="fa fa-trash red"></i> &nbsp Excluir Imagem</button>');
        }
        reader.readAsDataURL(this.files[0]);
    }
}

function reset(elm, prserveFileName) {
    if (elm && elm.length > 0) {
        var $input = elm;
        $('.cover').attr('src', window.location.origin + '/assets/img/default/empty-image.webp');
        if (!prserveFileName) {
            $($input).parent().parent().parent().find('input.fileUpload ').val("");
        }
        elm.remove();
    }
}

function editor() {

    ClassicEditor.create(document.querySelector('#inputArticle'), {
        extraPlugins: [MyCustomUploadAdapterPlugin],
        licenseKey: '',
        image: {
            toolbar: [
                'imageStyle:block',
                'imageStyle:inline',
                'imageStyle:side',
                'imageStyle:alignLeft',
                'imageStyle:alignRight',
                'imageStyle:alignBlockLeft',
                'imageStyle:alignBlockRight',
                'imageStyle:alignCenter',
                '|',
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'linkImage',
                'mediaEmbed'
            ]
        }
    }).then(editor => {
        
        const wordCountPlugin = editor.plugins.get('WordCount');
        const wordCountWrapper = document.getElementById('word-count');
        wordCountWrapper.appendChild( wordCountPlugin.wordCountContainer );
        window.editor = editor;
    }).catch(err => {
        console.error('Oops, something went wrong!');
        console.error('Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:');
        console.warn('Build id: g1spvgcch85q-nohdljl880ze');
        console.error(error);
    });

}

function googlePreview() {
    $.seoPreview({
        google_div: "#seopreview-google",
        facebook_div: "#seopreview-facebook",
        metadata: {
            title: $('#inputTitle'),
            desc: $('#inputMetaTitle'),
            url: {
                full_url: location.protocol + "//" + location.host + '/' + $('#inputSlug').val()
            }
        },
        google: {
            show: true,
            date: false
        },
        facebook: {
            show: false,
            featured_image: ''
        }
    });
}

