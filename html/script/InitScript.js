/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

$(document).ready(function() {
    // this attribute is not provided on every screen orientation change ...
    if (window.orientation != undefined) {
        OTMA.mobile = true;
    }

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

    var removeAllLayoutClasses = function() {
        $('#navigation').removeClass('navigationSide');
        $('#navigation').removeClass('navigationBottom');

        $('#main').removeClass('mainSide');
        $('#main').removeClass('mainBottom');
    };

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



    loadXML("otma-config.xml", function() {
        initialiseBoard();
        initialiseNPC();
        initialiseGameEngine();
        initialisePlayerService();
        initialiseView();
    });

});