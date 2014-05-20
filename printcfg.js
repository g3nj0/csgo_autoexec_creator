//=================================================================
//    Author: Jesse "G3NJ0" Zurawel
//    Created: 5/16/2014
//=================================================================
var printEvent;
var updateDelay = 500; // delay for which to update cfg text in milliseconds

test = function () {
    alert("meow");
}

writeCfgFile = function () {
    var cfgTextArea = $("#cfgtextarea");
    cfgTextArea.val(""); // clear text area

    //var crosshairInputs = document.getElementsByName("crosshair");
    $('label[for*=crosshair]').each(function (index) {
        cfgTextArea.val(cfgTextArea.val() + $(this).text() + " " + $(this).next().val() + ";\r");
    });
    //cfgTextArea.val(cfgTextArea.val() + $('input[type=color]').val());
}

$(document).ready(writeCfgFile);

// All inputs of type number will wait updateDelay milliseconds after changes are halted to update cfg text
$(document).ready(function(){
    $('input[type=number]').change(function () {
        window.clearTimeout(printEvent);
        printEvent = window.setTimeout(writeCfgFile, updateDelay);
    })
});

// Same as the function above but with .keypress as the event which triggers the update
$(document).ready(function () {
    $('input[type=number]').keypress(function () {
        window.clearTimeout(printEvent);
        printEvent = window.setTimeout(writeCfgFile, updateDelay);
    })
});

$(document).ready(function () {
    $('input[type=range]').change(function () {
        window.clearTimeout(printEvent);
        printEvent = window.setTimeout(writeCfgFile, updateDelay);
    })
});

//Transfers the color picked for the crosshair to the in
$(document).ready(function () {
    var crosshairColorpicker = $('#xhair_colorpicker');
    crosshairColorpicker.change(function () {
        var crosshairHexColor = crosshairColorpicker.val(); //#aabbcc
        
        var crosshairRed   = parseInt(crosshairHexColor.charAt(1) + crosshairHexColor.charAt(2), 16);
        var crosshairGreen = parseInt(crosshairHexColor.charAt(3) + crosshairHexColor.charAt(4), 16);
        var crosshairBlue  = parseInt(crosshairHexColor.charAt(5) + crosshairHexColor.charAt(6), 16);

        $('#crosshaircolorr').val(crosshairRed);
        $('#crosshaircolorr_slider').val(crosshairRed);
        $('#crosshaircolorg').val(crosshairGreen);
        $('#crosshaircolorg_slider').val(crosshairGreen);
        $('#crosshaircolorb').val(crosshairBlue);
        $('#crosshaircolorb_slider').val(crosshairBlue);
        window.setTimeout(writeCfgFile, updateDelay);
    })
});