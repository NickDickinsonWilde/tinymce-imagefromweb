tinyMCE 4 Plugin: ImageFromWeb
==============================

A plugin for tinyMCE 4.x

### installation

Create folder `imagefromweb` in `tinymce/plugins/` and unzip all files to that folder

Then add to your tinyMCE initialization script. For example:

```html
<script type="text/javascript">
tinymce.init({
	selector: "textarea",
	plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table directionality",
        "emoticons template paste textcolor responsivefilemanager statistics importcss",
		"autosave save youtube codemirror qrcode imagefromweb"
    ],
    toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    toolbar2: "save autosave | responsivefilemanager | print preview media | forecolor backcolor emoticons | code | youtube | qrcode | image_from_web",
    image_from_web: {
        upload_path: "/path to upload files to/"
		[other optional settings]		
		},  
	});
</script>
```

Optional Settings:
    shortcut: STRING, the keyboard shortcut code, for example: "CTRL+ALT+I"
    debug: BOOL, if true may enable a couple of debug prints.

### Demo

Coming Soon!

### Commercial use

For <b>commercial use</b> you can buy an unlimited license for one product for $5 [CAD or USD].

### Credits

TinyMCE: Obviously this wouldn't exist without TinyMCE since it is a plugin for TinyMCE.
Bootstrap: styling.
JQuery: just made all my JavaScript so much easier to code.

[http://blog.stevenlevithan.com/archives/parseuri]ParseURI
: so I didn't have to muck with regexp to get the filename.


Special thanks to Ceasar Feijen/cfconsultancy for his QRCode plugin which I shredded up to learn the tinyMCE api.

### Author
**Nick Wilde/BriarMoon Design (pacificmorrowind)**
design<at>briarmoon<dot>ca

[http://www.briarmoon.ca/design/]http://www.briarmoon.ca/design/