//=================================================================
//    Author: Jesse "G3NJ0" Zurawel
//    Created: 5/16/2014
//=================================================================
var printEvent;
var updateDelay = 500; // delay for which to update cfg text in milliseconds
var autoexecText;  // We will concatenate all of the autoexec text into this var

var crosshairColorpicker = $('#xhair_colorpicker');
var crosshaircolorrObj = $('#crosshaircolorr');
var crosshaircolorgObj = $('#crosshaircolorg');
var crosshaircolorbObj = $('#crosshaircolorb');

writeCfgFile = function () {
    autoexecText = $('#cfgtextarea').val(""); // clear text area and autoexecText

    autoexecText = "// ================== Rates ===================\n\n";
    appendNewCommand("rate", $("#rate_slider"));
    appendNewCommand("cl_cmdrate", $("#cmdrate_slider"));
    appendNewCommand("cl_updaterate", $("#updaterate_slider"));
    appendNewCommand("cl_interp", $("#interp_slider"));
    appendNewCommand("cl_interp_ratio", $("#interp_ratio"));

    autoexecText += "\n// =============== HUD settings ===============\n\n";
    appendNewCommand("cl_showfps", $("#showfps"));
    appendNewCheckedCommand("net_graph", $("#netgraph"));
    appendNewCheckedCommand("net_graphproportionalfont", $("#netgraphfont"));
    appendNewCommand("net_graphheight", $("#netgraphheight_slider"));
    appendNewCommand("net_graphpos", $("#netgraphpos_slider"));

    autoexecText += "\n// ============ Crosshair settings ============\n\n";
    appendNewCommand("cl_crosshairstyle", $("select[name=crosshairstyle]"));
    $('label[for*=crosshaircolor]').each(function (index) {
        appendNewCommand($(this).text(), $(this).next());
    })
    appendNewCommand("cl_crosshairalpha", $("#crosshairalpha_slider"));
    appendNewCheckedCommand("cl_crosshairdot", $("#crosshairdot"));

    autoexecText = autoexecText + "\nhost_writeconfig\n";
    $('#cfgtextarea').val(autoexecText);
};
$(document).ready(writeCfgFile);

// Appends a new command to the autoexecText variable
// commandName:String  domObj:DOMObject (object which you want the corresponding value of)
// appendNewCommand("cl_crosshaircolor_r" $('#crosshaircolorr'));
appendNewCommand = function (commandName, domObj) {
    autoexecText += commandName + " \"" + domObj.val() + "\"\n";
};
// Used for checkboxes
appendNewCheckedCommand = function (commandName, checkObj) {
    autoexecText += commandName + " \"" + (checkObj.prop("checked") ? 1 : 0) + "\"\n";  
};

RGBToColorValue = function (r, g, b) {
    var rhex = parseInt(r, 10).toString(16);
    var ghex = parseInt(g, 10).toString(16);
    var bhex = parseInt(b, 10).toString(16);

    if (rhex.length == 1)
        rhex = "0" + rhex;
    if (ghex.length == 1)
        ghex = "0" + ghex;
    if (bhex.length == 1)
        bhex = "0" + bhex;

    return "#" + rhex + ghex + bhex;
};

$(document).ready(function () {
    // All inputs of type number will wait updateDelay milliseconds after changes are halted to update cfg text
    $('input[type=number]').change(function () {
        window.clearTimeout(printEvent);
        printEvent = window.setTimeout(writeCfgFile, updateDelay);
    })
    // Same as the function above but with .keypress as the event which triggers the update
    $('input[type=number]').keypress(function () {
        window.clearTimeout(printEvent);
        printEvent = window.setTimeout(writeCfgFile, updateDelay);
    })
    // Updates the cfg text when a checkbox is changed
    $('input[type=checkbox]').change(function () {
        window.clearTimeout(printEvent);
        printEvent = window.setTimeout(writeCfgFile, 0);
    })
    // When any slider is changed the writeCfgFile method is called
    $('input[type=range]').change(function () {
        window.clearTimeout(printEvent);
        printEvent = window.setTimeout(writeCfgFile, updateDelay);
    })
    // When can select box is changed the writeCfgFile method is called
    $("select").change(function ()
    {
        window.clearTimeout(printEvent);
        printEvent = window.setTimeout(writeCfgFile, 0);
    })
});

//Transfers the color picked for the crosshair to the input textboxes and sliders for each color
$(document).ready(function () {
    crosshairColorpicker.change(function () {
        var crosshairHexColor = crosshairColorpicker.val(); // #rrggbb
        
        //var crosshairRed = (crosshairHexColor.charAt(1) + crosshairHexColor.charAt(2)).toString();
        var crosshairRed = parseInt(crosshairHexColor.charAt(1) + crosshairHexColor.charAt(2), 16);
        var crosshairGreen = parseInt(crosshairHexColor.charAt(3) + crosshairHexColor.charAt(4), 16);
        var crosshairBlue  = parseInt(crosshairHexColor.charAt(5) + crosshairHexColor.charAt(6), 16);

        crosshaircolorrObj.val(crosshairRed);
        $('#crosshaircolorr_slider').val(crosshairRed);
        crosshaircolorgObj.val(crosshairGreen);
        $('#crosshaircolorg_slider').val(crosshairGreen);
        crosshaircolorbObj.val(crosshairBlue);
        $('#crosshaircolorb_slider').val(crosshairBlue);
        window.setTimeout(writeCfgFile, 0);
    })
});

// Send new color value to the color picker
$(document).ready(function () {
    // Red ===================
    $('#crosshaircolorr').change(function () {
        crosshairColorpicker.val(RGBToColorValue(crosshaircolorrObj.val(), crosshaircolorgObj.val(), crosshaircolorbObj.val()));
    });
    $('#crosshaircolorr').keypress(function () {
        crosshairColorpicker.val(RGBToColorValue(crosshaircolorrObj.val(), crosshaircolorgObj.val(), crosshaircolorbObj.val()));
    });
    // Green ===================
    $('#crosshaircolorg').change(function () {
        crosshairColorpicker.val(RGBToColorValue(crosshaircolorrObj.val(), crosshaircolorgObj.val(), crosshaircolorbObj.val()));
    });
    $('#crosshaircolorg').keypress(function () {
        crosshairColorpicker.val(RGBToColorValue(crosshaircolorrObj.val(), crosshaircolorgObj.val(), crosshaircolorbObj.val()));
    });
    // Blue ===================
    $('#crosshaircolorb').change(function () {
        crosshairColorpicker.val(RGBToColorValue(crosshaircolorrObj.val(), crosshaircolorgObj.val(), crosshaircolorbObj.val()));
    });
    $('#crosshaircolorb').keypress(function () {
        crosshairColorpicker.val(RGBToColorValue(crosshaircolorrObj.val(), crosshaircolorgObj.val(), crosshaircolorbObj.val()));
    });

    //Sliders
    $('#crosshaircolorr_slider').change(function () {
        $('#xhair_colorpicker').val(RGBToColorValue(crosshaircolorrObj.val(), crosshaircolorgObj.val(), crosshaircolorbObj.val()));
    });
    $('#crosshaircolorg_slider').change(function () {
        $('#xhair_colorpicker').val(RGBToColorValue(crosshaircolorrObj.val(), crosshaircolorgObj.val(), crosshaircolorbObj.val()));
    });
    $('#crosshaircolorb_slider').change(function () {
        $('#xhair_colorpicker').val(RGBToColorValue(crosshaircolorrObj.val(), crosshaircolorgObj.val(), crosshaircolorbObj.val()));
    });
});


$(document).ready(function () {
    $('#downloadButton').click(function (e) {
        alert("meow");
        $.generateFile({
            filename: 'autoexec.cfg',
            content: $('#cfgtextarea').val(),
            script: 'download.php'
        });

        e.preventDefault();
    });
});