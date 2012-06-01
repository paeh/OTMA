/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

/**
 * Remove some element from a given array.
 * @param {Integer} index index of the element to remove
 * @param {Array} array array to remove the element from
 * @return {Boolean} true if the element was removed, else false.
 */
jQuery.removeIndexFromArray = function(index, array) {
    return jQuery.grep(array, function(elem, arrayIndex) {
        return arrayIndex !== index;
    });
};

/**
 * Implements a size method for the amount of javascript object keys.
 * @return {Number} amount of keys.
 */
Object.prototype.size = function () {
    var len = this.length ? --this.length : -1;
    for (var k in this)
        len++;
    return len;
};

OTMA.util = {
    /**
     * Get some random integer between 0 and maximum.
     * @param {Integer} maximum maximum
     * @return {Number} random number
     */
    getRandomInteger: function(maximum) {
        return Math.floor(Math.random() * maximum);
    },

    /**
     * Set the CSS visibility on an element found by using the given selector.
     * @param {String} selector selector used for finding the DOM element
     * @param {Boolean} doShow true if the DOM element should be visible, for hidden provide false
     */
    setCSSVisibilityOnElement: function(selector, doShow) {
        var attr = 'hidden';
        if (doShow) attr = 'visible';
        $(selector).css({
            visibility: attr
        });
    },

    /**
     * Add an element to a given array if it is not yet contained within the array (set functionality).
     * @param {Array} array array to use as a set
     * @param {Object} item item to add
     */
    addToArrayIfNotContained: function(array, item) {
        if ($.inArray(item, array) == -1) {
            array.push(item);
        }
    }
};
