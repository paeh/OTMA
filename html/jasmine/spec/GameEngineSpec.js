/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

describe('OTMA.GameEngine', function() {

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