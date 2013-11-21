function showalert(message, alerttype, linked) {
    "use strict";
    /**
        Bootstrap Alerts -
        Function Name - showalert()
        Inputs - message,alerttype
        Example - showalert("Invalid Login","alert-error")
        Types of alerts -- "alert-error","alert-success","alert-info"
        Required - You only need to add a alert_placeholder div in your html page wherever you want to display these alerts "<div id="alert_placeholder"></div>"
    **/
    $('#alert_placeholder').append('<div id="alertdiv" class="alert ' + alerttype + '"><a class="close" data-dismiss="alert">x</a><span>' + message + '</span></div>');
    if (linked) {
        $(linked).addClass("disabled");
        $('#alert_placeholder').bind('closed.bs.alert', function () {
            $(linked).removeClass("disabled");
        });
    }

    setTimeout(function() { // this will automatically close the alert and remove this if the users doesn't close it in 5 secs
        $("#alertdiv").remove();
        if (linked) {
            $(linked).removeClass("disabled");
            }
    }, 3000);
}
$("#process").click(function () {
    "use strict";
    var today = new Date(), // today's date - used in the filename.
        src = $("#source_path").val(), //path to the source image
        dest = $("#dest_path").val(), //filename to save the image 
        file_info = parseUri(src).file.split("."), //the original filename and extension
        funcs = parent.image_from_web_settings.plugin_path + "functions.php", //path to functions.php (which does the heavylifting of copying images).
        credit_link = $("#credit_link").val(), //
        credit_msg = $("#credit_msg").val(); //

    if (src === "") {
        showalert('Please enter a url!', 'alert-danger', "#process");
        return false;
    }
    if (dest === "") {
        dest = "%date%-%src_name%.%src_ext%";
        }
    if (credit_link === "") {
        credit_link = src;
    }
    if (credit_msg === "") {
        credit_msg = parseUri(credit_link).host;
    }
    if (parent.image_from_web_settings.credit_show === false) {
        credit_msg = "";
    }
    else {
        credit_msg = parent.image_from_web_settings.credit_msg.replace('%link%', "<a href='" + credit_link +"' target='_blank'>" + credit_msg + "</a>");
    }
    dest = parent.image_from_web_settings.upload_path + dest.replace(
        "%date%", today.toISOString().split("T")[0]).replace(      //replace date placeholder (if present) with today's date
        "%src_name%",file_info[0]).replace(           //replace name placeholder (if present) with source name
        "%src_ext%",file_info[1]).replace(/ /g, "-"); //replace extension placeholder (if present) with source's extension
    $.get(funcs, {task: "save_file", src: src, dest: dest, location: funcs}).done(function (data) {
        var imgdata = "<p><img src='" + data + "' />" + credit_msg;
        if( $("#image").is(':empty')) {
            $("#image").append(imgdata);
            return false;
        }
        $("#image").html("");
        $("#image").append(imgdata);
        });

});

$("#image").click(function() {//copy the image code to editor and close dialogue
    "use strict";
    parent.tinymce.activeEditor.insertContent($("#image").html());
    parent.tinymce.activeEditor.windowManager.close();
});