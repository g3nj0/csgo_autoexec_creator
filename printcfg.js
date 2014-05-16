//=================================================================
//    Author: Jesse "G3NJ0" Zurawel
//    Created: 5/16/2014
//=================================================================
var printEvent;
var updateDelay = 1000; // delay for which to update cfg text in milliseconds

test = function () {
    alert("meow");
}

// All inputs of type number will wait updateDelay milliseconds after changes are halted to update cfg text
$(document).ready(function(){
    $('input[type=number]').change(function () {
        window.clearTimeout(printEvent);
        printEvent = window.setTimeout(test, updateDelay);
    })
});

// Same as the function above but with .keypress as the event which triggers the update
$(document).ready(function () {
    $('input[type=number]').keypress(function () {
        window.clearTimeout(printEvent);
        printEvent = window.setTimeout(test, updateDelay);
    })
});