/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

describe('OTMA.GameEngine', function() {

    var playerService;
    var gameEngine;
    beforeEach(function() {
        playerService = OTMA.PlayerService.INSTANCE;
        gameEngine = OTMA.GameEngine.INSTANCE;
    });

    it("should be possible to get the current board element", function() {
        playerService.Player.coordinate = '1x5';

        var element = {a: 'b'};
        OTMA.Board.INSTANCE.boardElements['1x5'] = element;

        expect(gameEngine.getCurrentPlayerBoardElement()).toBe(element);
    });

    it("should return true if all win conditions are met", function() {
        // in a test we may assign values to a constant!
        OTMA.Constants.WIN_HINT_COUNT = 1;
        OTMA.Constants.WIN_NPC_COUNT = 1;

        expect(gameEngine.checkWinConditions()).toBe(false);

        playerService.Player.foundHints = [ 1 ];
        playerService.Player.foundNPC = [ 1 ];

        expect(gameEngine.checkWinConditions()).toBe(true);
    });

    it("should be possible to get the door associated to the current player", function() {
        gameEngine.setState('some');
        expect(gameEngine.getCurrentPlayerDoor()).toBeUndefined();

        gameEngine.setState('DOOR');
        OTMA.PlayerService.INSTANCE.Player.viewingDoor = 'west';

        var element = new OTMA.domain.BoardElement();
        var door = new OTMA.domain.Door(element, 'west');
        element.west = door;
        gameEngine.getCurrentPlayerBoardElement = function() {
            return element;
        };
        expect(gameEngine.getCurrentPlayerDoor()).toBe(door);
    });
});