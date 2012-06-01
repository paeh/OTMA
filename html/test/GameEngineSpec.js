/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

describe('OTMA.GameEngine', function() {

    var playerService;
    beforeEach(function() {
        playerService = OTMA.PlayerService.INSTANCE;
    });

    it("should be possible to get the current board element", function() {
        playerService.Player.coordinate = '1x5';

        var element = {a: 'b'};
        OTMA.Board.INSTANCE.boardElements['1x5'] = element;

        expect(OTMA.GameEngine.getCurrentBoardElement()).toBe(element);
    });

    it("should return true if all win conditions are met", function() {
        // in a test we may assign values to a constant!
        OTMA.Constants.WIN_HINT_COUNT = 1;
        OTMA.Constants.WIN_NPC_COUNT = 1;

        expect(OTMA.GameEngine.checkWinConditions()).toBe(false);

        playerService.Player.foundHints = [ 1 ];
        playerService.Player.foundNPC = [ 1 ];

        expect(OTMA.GameEngine.checkWinConditions()).toBe(true);
    });
});