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

describe('OTMA.GameEngine', function() {
    it("should be possible to get a random hint",  function() {
        OTMA.util.getRandomInteger = function() { return 1 };
        var hint1 = { text: 'a' };
        var hint2 = { text: 'b' };
        OTMA.GameEngine.hints = [hint1, hint2 ];

        expect(OTMA.GameEngine.getRandomRoomHint()).toBe(hint2);
    });

    it("should be possible to get the current board element", function() {
        OTMA.PlayerService.Player.coordinate = '1x5';

        var element = {a: 'b'};
        OTMA.Board.boardElements['1x5'] = element;

        expect(OTMA.GameEngine.getCurrentBoardElement()).toBe(element);
    });

    it("should return true if all win conditions are met", function() {
        OTMA.Constants.WIN_HINT_COUNT = 1;
        OTMA.Constants.WIN_NPC_COUNT = 1;

        expect(OTMA.GameEngine.checkWinConditions()).toBe(false);

        OTMA.PlayerService.Player.foundHints = [ 1 ];
        OTMA.PlayerService.Player.foundNPC = [ 1 ];

        expect(OTMA.GameEngine.checkWinConditions()).toBe(true);
    });
});