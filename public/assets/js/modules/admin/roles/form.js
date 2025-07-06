$(function () {
    $('#permission_tree').jstree({
        'plugins': ["wholerow", "checkbox"],
            'core' : {
                'data' : {
                    "url" : urls.tree,
                    "plugins" : [ "wholerow", "checkbox" ],
                    "dataType" : "json" // needed only if you do not supply JSON headers
                },
                'themes': {
                    'name': 'proton',
                    'responsive': true
                }
            }
        }) 
});