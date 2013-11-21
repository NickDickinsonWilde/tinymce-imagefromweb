tinyMCE 4 Plugin: ImageFromWeb
==============================

A plugin for tinyMCE 4.x

## installation

Create folder `imagefromweb` in `tinymce/plugins/` and unzip all files to that folder

Then add it to your tinyMCE initialization script. For example:

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

    shortcut: STRING, [""],the keyboard shortcut code, for example: "CTRL+ALT+I"

    debug: BOOL, [false], if true may enable a couple of debug prints.
    
    credit_show: BOOL, [true]
    
    credit_msg : STRING, ["<p>Repost from: %link%.</p>"], credit message to put after the image (with %link% replaced by the actual link to the original). OR BOOL false to disable. 

## Demo

Coming Soon!

## Commercial use

For <b>commercial use</b> you can buy an unlimited license for one product for $5 [CAD or USD].

## Credits

TinyMCE: Obviously this wouldn't exist without TinyMCE since it is a plugin for TinyMCE.

Bootstrap: styling.

JQuery: just made all my JavaScript so much easier to code.

[ParseURI](http://blog.stevenlevithan.com/archives/parseuri): so I didn't have to muck with regexp to get the filename.

[JSCompress](http://jscompress.com/): quick and easy js minifier.


Special thanks to Ceasar Feijen/cfconsultancy for his QRCode plugin which I shredded up to learn the tinyMCE api (and for that matter bootstrap... oh and my first JQuery code was an addition to his plugin).

## Author
**Nick Wilde/[BriarMoon Design](http://www.briarmoon.ca/design/) (pacificmorrowind)**
design(at)briarmoon(dot)ca

##Changelog

Version 1.0.0 (2013-11-21)

*   Updated readme to be *much* better.
*   Added option to automatically (or with user input) also provide a image credit line.
*   Various tidyings and improvements.
*   Fixed date output to use ISO standard.
    
Version 0.0.9-BETA (2013-11-20)

*   First Beta. Everything *SHOULD* work.