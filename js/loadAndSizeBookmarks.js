"use strict";

var path = "source/img/bookmark_pictures/";

var bookmarks = [{
        name: "Telegram",
        picture: path + "telegram.png",
        link: "https://web.telegram.org/#/im"
}, {
        name: "Whatsapp",
        picture: path + "whatsapp.png",
        link: "https://web.whatsapp.com"
}, {
        name: "Youtube",
        picture: path + "youtube.png",
        link: "https://www.youtube.com"
}, {
        name: "Twitch",
        picture: path + "twitch.png",
        link: "https://www.twitch.tv/"
},{
        name: "SoundCloud",
        picture: path + "soundcloud.png",
        link: "https://soundcloud.com/"
}, {
        name: "Deezer",
        picture: path + "deezer.png",
        link: "https://www.deezer.com/"
}, {
        name: "Linguee",
        picture: path + "linguee.jpg",
        link: "http://www.linguee.de/englisch-deutsch/"
}, {
        name: "Translate",
        picture: path + "google_translate.png",
        link: "https://translate.google.de/?hl=en&tab=TT#de/"
}, {
        name: "Tagesschau",
        picture: path + "tagesschau.jpg",
        link: "http://www.tagesschau.de/sendung/tagesschau/index.html"
}, {
        name: "Bitbucket",
        picture: path + "bitbucket.png",
        link: "https://bitbucket.org/dashboard/overview"
}, {
        name: "Github",
        picture: path + "github.png",
        link: "https://github.com"
}, {
        name: "GMail",
        picture: path + "gmail.png",
        link: "https://mail.google.com/"
}, {
        name: "Outlook",
        picture: path + "outlook.png",
        link: "https://msx.tu-dresden.de/owa/auth/logon.aspx?replaceCurrent=1&url=https%3a%2f%2fmsx.tu-dresden.de%2fowa%2f"
}, {
        name: "Sparkasse",
        picture: path + "sparkasse.png",
        link: "https://www.ostsaechsische-sparkasse-dresden.de"
}];

function loadBookmarks() {

    for (var b = 0; b < bookmarks.length; b++) {

        $(".bookmarksWrapper").append($("<a href='" + bookmarks[b].link + "'><div id='" + bookmarks[b].name + "' class='linkObject'><div class='pictureSizeHelper'><img src='" + bookmarks[b].picture + "'></div><p>" + bookmarks[b].name + "</p></div></a>"));
    }

    $(".linkObject").fadeIn("fast");
}

function sizeBookmarks() {

    let screenHeight = screen.height;
    let screenWidth = screen.width;

    let linkObjectMargin = 5;
    let maxWidth = $(".position-Helper").width();

    var linkObjectWidth = screenWidth * 0.084;

    // Lesezeichen skalieren
    $(".linkObject").css("width", linkObjectWidth);
    $(".linkObject").css("height", screenWidth * 0.097);
    $(".linkObject p").css("font-size", screenHeight * 0.017);
    $(".linkObject").css("margin", linkObjectMargin);

    //Wie breit ist ein linkObject mit Margin aufgerundet?
    let var1 = linkObjectWidth + 2 * linkObjectMargin;

    //Wie viele linkObjects passen auf eine Zeile
    let var2 = maxWidth / Math.ceil(var1);

    //Wie viel Platz sollte auf einer Line noch sein, nachdem sich die linkObjects verteilt haben?
    let var3 = maxWidth - Math.floor(var2) * var1;

    //margin-left ist die Hälfte des Platzes der noch zur verfügung stehen sollte nachdem sich die linkObjects verteilt haben...
    $(".scrollbox-Cover").css("margin-left", var3 * 0.5);
}

$(window).resize(
    function () {
        sizeBookmarks();
    });

loadBookmarks();
sizeBookmarks();
