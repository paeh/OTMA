/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

/*
 Be very, very careful when changing something here.
 This functionality implements screen rotation and zooming on
 different display sizes (i.e. computer / smartphone browsers).
 */
$(document).ready(function() {
    // this attribute is not provided on every screen orientation change ...
    if (window.orientation != undefined) {
        OTMA.mobile = true;
    }

    /**
     * Update all the layout, meaning that all content divs are resized according to the current screen orientation
     * and size.
     */
    var updateLayout = function() {
        removeAllLayoutClasses();

        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;

        if (OTMA.mobile) {
            window.scrollTo(0, 2);
            if (window.orientation == '0') {
                if (window.innerHeight < window.innerWidth) {
                    windowHeight = window.innerWidth;
                    windowWidth = window.innerHeight;
                }
            } else {
                if (window.innerHeight > window.innerWidth) {
                    windowHeight = window.innerWidth;
                    windowWidth = window.innerHeight;
                }
            }
        } else {
            windowHeight = window.innerHeight;
            windowWidth = window.innerWidth;
        }

        if (windowHeight < windowWidth) {
            setSideLayout(windowHeight, windowWidth);
        } else {
            setBottomLayout(windowHeight, windowWidth);
        }
    };

    /**
     * Scale the content pane according to the main dimension and a given zoom factor
     * @param {Integer} mainDimension main dimension, meaning the bigger one of x or y.
     * @param {Integer} zoom zoom factor
     */
    var setDimensionAndZoom = function(mainDimension,  zoom) {
        mainDimension = mainDimension / zoom;

        var mainWidthPx = mainDimension + 'px';
        var mainHeightPx = mainDimension + 'px';
        $('#main').css({
            zoom: zoom
        });

        $('div.content').css({
            height: mainHeightPx,
            width: mainWidthPx
        });
    };

    /**
     * Remove all navigation layout classes, so that no side layout or bottom layout is set any more.
     */
    var removeAllLayoutClasses = function() {
        $('#navigation').removeClass('navigationSide');
        $('#navigation').removeClass('navigationBottom');

        $('#main').removeClass('mainSide');
        $('#main').removeClass('mainBottom');
    };

    /**
     * Sets the navigation components to the left.
     * @param {Integer} windowHeight window height
     * @param {Integer} windowWidth window width
     */
    var setSideLayout = function (windowHeight, windowWidth) {
        $('#navigation').addClass('navigationSide');
        $('#main').addClass('mainSide');

        var mainDimension = windowHeight;
        var zoomFactor = mainDimension / 400;

        var diff = windowWidth - windowHeight;
        var requiredNavigationSize = 200 * zoomFactor;
        if (diff < requiredNavigationSize) {
            mainDimension -= (requiredNavigationSize - diff) / zoomFactor;
            zoomFactor = mainDimension / 400;
        }

        setDimensionAndZoom(mainDimension, zoomFactor);
    };

    /**
     * Sets the navigation components to the bottom.
     * @param {Integer} windowHeight window height
     * @param {Integer} windowWidth window width
     */
    var setBottomLayout = function (windowHeight, windowWidth) {
        $('#navigation').addClass('navigationBottom');
        $('#main').addClass('mainBottom');

        var mainDimension = windowWidth;
        var zoomFactor = mainDimension / 400;

        var diff = windowHeight - windowWidth;
        var requiredNavigationSize = 150 * zoomFactor;
        if (diff < requiredNavigationSize) {
            mainDimension -= (requiredNavigationSize - diff) / zoomFactor;
            zoomFactor = mainDimension / 400;
        }

        setDimensionAndZoom(mainDimension, zoomFactor);
    };

    updateLayout();

    var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    window.addEventListener(orientationEvent, function() {
        updateLayout();
    }, false);

    // init xml loading
    loadXML("otma-config.xml", function() {
        // ... and initialise everything else when the callback is called
        initialiseBoard();
        initialiseNPC();
        initialiseGameEngine();
        initialisePlayerService();
        initialiseView();
    });

    OTMA.PlayerService.INSTANCE.Player.viewingDoor = 'WIN'
});