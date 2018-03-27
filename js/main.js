(function () {

    $.ajax({
        type: "GET",
        url: "json/bookmarks.json",
        success: function(content) {
            loadBookmarks(content);
            sizeBookmarks();
            window.addEventListener('resize', sizeBookmarks);
        }
    });

})()

function loadBookmarks(object) {

    const bookmarks = object.data, mainPath = object.path, bookmarkWrapper = $(".bookmark-viewer");

    for (var counter=0,length=bookmarks.length; counter < length; counter++){
        bookmarkWrapper.append("<a href='"+bookmarks[counter].link+"'><div class='linkObject'><img src='"+mainPath+bookmarks[counter].picture+"'><p>"+bookmarks[counter].name+"</p></div></a>");
    }

}

function sizeBookmarks() {

    const bookamrks = $(".linkObject");
    let bookamrksWidth = bookamrks.css("width");
    bookamrksWidth = bookamrksWidth.slice(0, bookamrksWidth.length-2);

    const bookmarksHeight = bookamrksWidth*1.2;
    const value = bookmarksHeight+"px ";

    $(".bookmark-viewer").css("grid-template-rows", value+value+value+value );
    $(".linkObject p").css("font-size", bookmarksHeight*0.12 );

}

const API = (function () {

    const boxJQuery = $("#searchBox");

    const re_weburl = new RegExp(
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

    const logic = {

        currentValue: "",
        URLStatus: false,

        getInput: function () {
            logic.currentValue = boxJQuery.val();
        },

        reduceInput: function () {
            let string = logic.currentValue.replace(/  +/g, ' ');
            logic.currentValue = string.trim();
        },

        clearInputBox: function () {
            boxJQuery.val("");
        },
        focusBox : function () {
            boxJQuery.focus();
        },

        inputConsistOfURL: function () {
            if (re_weburl.test(logic.currentValue)) {
                logic.URLStatus = true;
            } else {
                logic.URLStatus = false;
            }
        },

        follow: function () {
            window.open(logic.currentValue, "_self");
        },

        createArray: function () {
            logic.currentValue = logic.currentValue.split(" ");
        },

        searchEngine: function () {
            let output = "";
            const currentValue = logic.currentValue;

            if (true) {

                /*
                Work with Google as Search Engine
                */

                for (var i = 0, length = currentValue.length; i < length; i++) {
                    output = output + currentValue[i] + "+";
                }

                output = output.slice(0, output.length - 1);

                logic.currentValue = "https://www.google.de/search?q=" + output;

            } else {

                /*
                Work with Quantum as Search Engine
                */

                for (var i = 0, length = currentValue.length; i < length; i++) {
                    output = output + currentValue[i] + " ";
                }

                output = output.slice(0, output.length - 1);

                logic.currentValue = "https://www.qwant.com/?q=" + output + "&t=web";
            }
        }

    };

    const enterEvent = function(e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            if (boxJQuery.is(":focus")) {
                takeInput();
                return;
            }
        }
        boxJQuery.focus();
    };

    $(document).on("keydown", enterEvent);

    return logic;

})();

function takeInput() {
    API.getInput();
    API.reduceInput();

    if(!API.currentValue){
        API.clearInputBox();
        API.focusBox();
        return;
    }

    API.inputConsistOfURL();

    if(API.URLStatus){
        API.follow();
        API.clearInputBox();
        return;
    }

    API.createArray();

    API.searchEngine();

    API.clearInputBox();

    API.follow();
}
