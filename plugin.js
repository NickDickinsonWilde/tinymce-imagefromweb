var image_from_web_settings = {
    plugin_path: tinyMCE.baseURL + "/plugins/imagefromweb/", //really wish there was a default tinyMCE variable for that but there isn't
    title      : "Insert Image from Web", 
    shortcut   : "", //the keyboard shortcut code, for example: "CTRL+ALT+I"
    debug      : false, 
    upload_path: "/media/images/"
};//default settings

tinymce.PluginManager.add('imagefromweb', function(editor) {
    "use strict";
    if (editor.settings.image_from_web === "undefined") {
        //if plugin options are set in tinyMCE initialization merge them into settings.
        $.extend(true, image_from_web_settings, editor.settings.image_from_web);
        }

    if (image_from_web_settings.debug) {
        console.log(image_from_web_settings);
        }
    function openmanager() {
        
        win = editor.windowManager.open({
            title: image_from_web_settings.title,
            file: image_from_web_settings.plugin_path + "image_from_web.html",
            filetype: 'image',
            width: 650,
            height: 540,
            inline: 1,
            buttons: [{
                text: 'cancel',
                onclick: function() {
                    this.parent()
                        .parent()
                        .close();
                }
            }]
        });

    }
    editor.addButton('image_from_web', {
        icon: true,
        image: image_from_web_settings.plugin_path + "icon.png",
        tooltip: image_from_web_settings.title,
        shortcut: image_from_web_settings.shortcut,
        onclick: openmanager
    });

    editor.addShortcut(image_from_web_settings.shortcut, '', openmanager);

    editor.addMenuItem('image_from_web', {
        icon: "image_from_web",
        text: image_from_web_settings.title,
        shortcut: image_from_web_settings.shortcut,
        onclick: openmanager,
        context: 'insert'
    });
    
    $('<link>')
    .appendTo($('head'))
    .attr({type : 'text/css', rel : 'stylesheet', href : image_from_web_settings.plugin_path + 'css/editor-style.css'});
});
