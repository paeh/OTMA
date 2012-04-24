/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

jQuery.removeIndexFromArray = function(index, arr) {
    return jQuery.grep(arr, function(elem, arrayIndex) {
        return arrayIndex !== index;
    });
};

Object.prototype.size = function () {
    var len = this.length ? --this.length : -1;
    for (var k in this)
        len++;
    return len;
};

OTMA.util = {
    getRandomInteger: function(maximum) {
        return Math.floor(Math.random() * maximum);
    },
    setCSSVisibilityOnElement: function(selector, doShow) {
        var attr = 'hidden';
        if (doShow) attr = 'visible';
        $(selector).css({
            visibility: attr
        });
    },
    addToArrayIfNotContained: function(array, item) {
        if ($.inArray(item, array) == -1) {
            array.push(item);
        }
    }
};
