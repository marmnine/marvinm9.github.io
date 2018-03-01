"use strict";

////////////////////////////////////////////////////////////////////
///////////////////////////// Search ///////////////////////////////
////////////////////////////////////////////////////////////////////

var re_weburl = new RegExp(
    "^" +
    // protocol identifier
    "(?:(?:https?|ftp)://)" +
    // user:pass authentication
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
    // IP address exclusion
    // private & local networks
    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
    "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
    "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broacast addresses
    // (first & last IP address of each class)
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
    "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
    // host name
    "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
    // domain name
    "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
    // TLD identifier
    "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
    // TLD may end with dot
    "\\.?" +
    ")" +
    // port number
    "(?::\\d{2,5})?" +
    // resource path
    "(?:[/?#]\\S*)?" +
    "$", "i"
);

// DO

function cleanInputFiled() {
    $("#searchBox").val("");
}

function cleanInputValue(value) {
    let string = value.replace(/  +/g, ' ');
    return string.trim();
}

function tearInputApart(value) {
    return value.split(" ");
}

function openSite(x, target) {
    window.open(x, target);
}

// CHECK

function isValueStringEmpty(value) {
    if (value.length < 1) {
        return true;
    }
    return false;
}

function isThisAnURL(string) {
    if (re_weburl.test(string)) {
        return true;
    }
    return false;
}

// MULTIPLE SEARCH ENGINES

function prepareGoogleSearch(objectiv) {
    let output = "";

    for (var i = 0; i < objectiv.length; i++) {
        output = output + objectiv[i] + "+";
    }

    output = output.slice(0, output.length-1);

    return "https://www.google.de/search?q=" + output;
}

function prepareQuantSearch(objectiv){
    let output = "";
    
    for (var i = 0; i < objectiv.length; i++) {
        output = output + objectiv[i] + " ";
    }

    output = output.slice(0, output.length-1);

    return "https://www.qwant.com/?q=" + output +"&t=web";
}

// MAIN

function takeInput() {

    var value = $("input[id=searchBox]").val();

    cleanInputFiled();

    value = cleanInputValue(value);

    if (isValueStringEmpty(value)) {
        $("#searchBox").focus();
        return;
    }

    if (isThisAnURL(value)) {
        openSite(value, "_self");
        return;
    }

    let valueArray = tearInputApart(value);

    let finalString = prepareGoogleSearch(valueArray);

    openSite(finalString, "_self");

}

// Initial

function enterPressed(e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        if ($("#searchBox").is(":focus")) {
            takeInput();
            return;
        }
    }
    $("#searchBox").focus();
}

$(document).ready(
    function () {
        $(document).on("keydown", enterPressed);
    });
