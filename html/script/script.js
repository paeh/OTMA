$(document).ready(function() {

    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;

    var mainDimension;
    var zoomFactor;
    if (windowHeight < windowWidth) {
        mainDimension = windowHeight;
        zoomFactor = mainDimension / 480;
        mainDimension -= (150 * zoomFactor);
    } else {
        mainDimension = windowWidth;
        zoomFactor = mainDimension / 400;
    }

    mainDimension = mainDimension / zoomFactor;


    var mainWidthPx = mainDimension + 'px';
    var mainHeightPx = mainDimension + 'px';
    $('#main').css({
        width: mainWidthPx,
        zoom: zoomFactor
    });

    $('#content').css({
        height: mainHeightPx,
        width: mainWidthPx
    });

    $('#navigation').css({
        top: mainHeightPx,
        width: mainWidthPx
    });

    loadXML("otma-config.xml", function() {
        initialiseBoard();
        initialiseNPC();
        loadNavigationFunctions();
        initialiseEngine();
        initialiseView();
    });

});