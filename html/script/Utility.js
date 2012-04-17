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
