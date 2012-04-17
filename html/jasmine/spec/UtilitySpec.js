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

describe('OTMA.Utility', function() {
    it('is possible to add an item to an array if it is not yet contained', function() {
        var array = [];

        OTMA.util.addToArrayIfNotContained(array, 'a');
        expect(array.length).toBe(1);

        OTMA.util.addToArrayIfNotContained(array, 'a');
        expect(array.length).toBe(1);

        OTMA.util.addToArrayIfNotContained(array, 'b');
        expect(array.length).toBe(2);

        expect(array).toContain('a');
        expect(array).toContain('b');

    });
});