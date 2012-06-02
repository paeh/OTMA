/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

describe("OTMA.PlayerService", function() {
    var boardElement;
    var playerService;
    var gameEngine;
    beforeEach(function() {
        playerService = OTMA.PlayerService.INSTANCE;
        gameEngine = OTMA.GameEngine.INSTANCE;

        boardElement = new OTMA.domain.BoardElement(undefined, 'initial');
        boardElement.north = new OTMA.domain.BoardElement(undefined, 'north');
        boardElement.south = new OTMA.domain.BoardElement(undefined, 'south');
        boardElement.west = new OTMA.domain.Door(boardElement, 'west');
        boardElement.east = new OTMA.domain.Door(boardElement, 'east');

        boardElement.west.room = new OTMA.domain.Room('', '', '', [], []);

        var board = OTMA.Board.INSTANCE;
        board.boardElements['initial'] = boardElement;
        board.boardElements['north'] = boardElement.north;
        board.boardElements['south'] = boardElement.south;
    });

    it("should handle state MAP move with an undefined direct map item", function() {
        playerService.Player.coordinate = 'initial';
        expect(playerService.states.MAP.moveCurrentPlayer("someDirection", boardElement)).toBeFalsy();
        expect(playerService.Player.coordinate).toBe('initial');
    });

    it("should handle state MAP move with correct target map item correctly", function() {
        playerService.Player.coordinate = 'initial';
        expect(playerService.states.MAP.moveCurrentPlayer('north', boardElement)).toBeTruthy();
        expect(playerService.Player.coordinate).toBe('north');
    });

    it("should handle state MAP move with door as target correctly", function() {
        playerService.Player.coordinate = 'some';
        playerService.states.MAP.moveCurrentPlayer('west', boardElement);
        expect(playerService.Player.coordinate).toBe('some');
        expect(playerService.Player.viewingDoor).toBe('west');
        expect(gameEngine.state).toBe('DOOR');
    });

    it("should ignore state DOOR moves without an attached room", function() {
        playerService.Player.viewingDoor = 'east';
        expect(playerService.states.DOOR.moveCurrentPlayer('north', boardElement)).toBeFalsy();
    });

    it("should block state DOOR moves towards a win room when not meeting all requirements", function() {
        playerService.Player.viewingDoor = 'west';
        boardElement.west.room.type = 'WIN_ROOM';
       gameEngine.checkWinConditions = function() { return false };
        expect(playerService.states.DOOR.moveCurrentPlayer('north', boardElement)).toBeFalsy();
    });

    it("should not block state DOOR moves towards a win room when not meeting all requirements", function() {
        playerService.Player.viewingDoor = 'west';
        boardElement.west.room.type = 'WIN_ROOM';
        gameEngine.checkWinConditions = function() { return true };
        expect(playerService.states.DOOR.moveCurrentPlayer('north', boardElement)).toBeTruthy();
        expect(playerService.Player.viewingRoom).toBeTruthy();
    });

    it("should be possible to walk back towards the map", function() {
        playerService.Player.viewingDoor = 'west';
        expect(playerService.states.DOOR.moveCurrentPlayer('south', boardElement)).toBeTruthy();
        expect(gameEngine.state).toBe('MAP');
        expect(playerService.Player.viewingDoor).toBe(undefined);
    });

    it("should be possible to walk out of a room when having the direction property set to south", function() {
        playerService.Player.viewingDoor = 'west';
        expect(playerService.states.ROOM.moveCurrentPlayer('south', boardElement)).toBeTruthy();
        expect(gameEngine.state).toBe('DOOR');
    });

    it("should not be possible to walk in any other direction than south when being in a room", function() {
        playerService.Player.viewingDoor = 'west';
        expect(playerService.states.ROOM.moveCurrentPlayer('west', boardElement)).toBeFalsy();
        expect(playerService.states.ROOM.moveCurrentPlayer('east', boardElement)).toBeFalsy();
        expect(playerService.states.ROOM.moveCurrentPlayer('north', boardElement)).toBeFalsy();
    });

    it("should not be possible to walk out of the win room", function() {
        playerService.Player.viewingDoor = 'west';
        boardElement.west.room.type = 'WIN_ROOM';
        expect(playerService.states.ROOM.moveCurrentPlayer('south', boardElement)).toBeFalsy();
    });

    it("should use the current players board element when the general move method is called", function() {
        playerService.Player.coordinate = 'initial';
        playerService.currentState = playerService.states.MAP;
        playerService.states.MAP.moveCurrentPlayer = function(direction, element) {
            expect(direction).toBe('myDirection');
            expect(element).toBe(boardElement);
        };

        playerService.moveCurrentPlayer('myDirection');
    });


});