[![Build Status](https://travis-ci.org/PacificMorrowind/tinymce-imagefromweb.svg)](https://travis-ci.org/PacificMorrowind/tinymce-imagefromweb) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
tinyMCE 4 Plugin: ImageFromWeb
==============================

A plugin for tinyMCE 4.x

This plugin lets you upload images to your server from another location on the internet (ie so you aren't abusing their bandwidth) and inserts it into your tinyMCE edit window.

## installation

Create folder `imagefromweb` in `tinymce/plugins/` and unzip all files to that folder.

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
        upload_path: "/path to upload files to/", //relative to the plugin location. - if unset will default to "../../../../media/images/"
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

## Building

It is set up with a a [Grunt](http://gruntjs.com) buildfile so all you have to do is install [Node.js](http://nodejs.org) and then run (from a command prompt cd'ed to the project's location).

```
npm install -g grunt-cli
npm install
grunt
```

More build options are listed in `gruntfile.js`.


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

version 1.1.0 (2014-04-02)

*   All code run through JSLint
*   Added automated building (Grunt)
*   Releases now have:
    *   Minified CSS
    *   All unused selectors have been removed from css files (including bootstrap).
    *   Images minified
    *   HTML minified


Version 1.0.0 (2013-11-21)

*   Updated readme to be *much* better.
*   Added option to automatically (or with user input) also provide a image credit line.
*   Various tidyings and improvements.
*   Fixed date output to use ISO standard.

Version 0.0.9-BETA (2013-11-20)

*   First Beta. Everything *SHOULD* work.
