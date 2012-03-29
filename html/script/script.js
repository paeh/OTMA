$(document).ready(function() {
    var height = window.innerHeight;
    var width = window.innerWidth;



    var mainDimension;
    var zoomFactor;
    if (height < width) {
        mainDimension = height;
        zoomFactor = 1200 / mainDimension;
        mainDimension -= (150 * zoomFactor);
    } else {
        mainDimension = width;
        zoomFactor = 2800 / mainDimension;
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

    // assume to be mobile

    loadXML("otma-config.xml", function() {
        initialiseBoard();
        initialiseNPC();
        loadNavigationFunctions();
        initialiseEngine();
        initialiseView();
    });

});