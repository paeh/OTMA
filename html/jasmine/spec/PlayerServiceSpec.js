/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

describe("OTMA.PlayerService", function() {
    var boardElement;
    beforeEach(function() {
        boardElement = new OTMA.domain.BoardElement(undefined, 'initial');
        boardElement.north = new OTMA.domain.BoardElement(undefined, 'north');
        boardElement.south = new OTMA.domain.BoardElement(undefined, 'south');
        boardElement.west = new OTMA.domain.Door(boardElement, 'west');
        boardElement.east = new OTMA.domain.Door(boardElement, 'east');

        boardElement.west.room = new OTMA.domain.Room('', '', '', [], []);

        OTMA.Board.boardElements['initial'] = boardElement;
        OTMA.Board.boardElements['north'] = boardElement.north;
        OTMA.Board.boardElements['south'] = boardElement.south;
    });

    it("should handle state MAP move with an undefined direct map item", function() {
        OTMA.PlayerService.Player.coordinate = 'initial';
        expect(OTMA.PlayerService.states.MAP.movePlayer("someDirection", boardElement)).toBeFalsy();
        expect(OTMA.PlayerService.Player.coordinate).toBe('initial');
    });

    it("should handle state MAP move with correct target map item correctly", function() {
        OTMA.PlayerService.Player.coordinate = 'initial';
        expect(OTMA.PlayerService.states.MAP.movePlayer('north', boardElement)).toBeTruthy();
        expect(OTMA.PlayerService.Player.coordinate).toBe('north');
    });

    it("should handle state MAP move with door as target correctly", function() {
        OTMA.PlayerService.Player.coordinate = 'some';
        OTMA.PlayerService.states.MAP.movePlayer('west', boardElement);
        expect(OTMA.PlayerService.Player.coordinate).toBe('some');
        expect(OTMA.PlayerService.Player.viewingDoor).toBe('west');
        expect(OTMA.GameEngine.state).toBe('DOOR');
    });

    it("should ignore state DOOR moves without an attached room", function() {
        OTMA.PlayerService.Player.viewingDoor = 'east';
        expect(OTMA.PlayerService.states.DOOR.movePlayer('north', boardElement)).toBeFalsy();
    });

    it("should block state DOOR moves towards a win room when not meeting all requirements", function() {
        OTMA.PlayerService.Player.viewingDoor = 'west';
        boardElement.west.room.type = 'WIN_ROOM';
        OTMA.GameEngine.checkWinConditions = function() { return false };
        expect(OTMA.PlayerService.states.DOOR.movePlayer('north', boardElement)).toBeFalsy();
    });

    it("should not block state DOOR moves towards a win room when not meeting all requirements", function() {
        OTMA.PlayerService.Player.viewingDoor = 'west';
        boardElement.west.room.type = 'WIN_ROOM';
        OTMA.GameEngine.checkWinConditions = function() { return true };
        expect(OTMA.PlayerService.states.DOOR.movePlayer('north', boardElement)).toBeTruthy();
        expect(OTMA.PlayerService.Player.viewingRoom).toBeTruthy();
    });

    it("should be possible to walk back towards the map", function() {
        OTMA.PlayerService.Player.viewingDoor = 'west';
        expect(OTMA.PlayerService.states.DOOR.movePlayer('south', boardElement)).toBeTruthy();
        expect(OTMA.GameEngine.state).toBe('MAP');
        expect(OTMA.PlayerService.Player.viewingDoor).toBe(undefined);
    });

    it("should be possible to walk out of a room when having the direction property set to south", function() {
        OTMA.PlayerService.Player.viewingDoor = 'west';
        expect(OTMA.PlayerService.states.ROOM.movePlayer('south', boardElement)).toBeTruthy();
        expect(OTMA.GameEngine.state).toBe('DOOR');
    });

    it("should not be possible to walk in any other direction than south when being in a room", function() {
        OTMA.PlayerService.Player.viewingDoor = 'west';
        expect(OTMA.PlayerService.states.ROOM.movePlayer('west', boardElement)).toBeFalsy();
        expect(OTMA.PlayerService.states.ROOM.movePlayer('east', boardElement)).toBeFalsy();
        expect(OTMA.PlayerService.states.ROOM.movePlayer('north', boardElement)).toBeFalsy();
    });

    it("should not be possible to walk out of the win room", function() {
        OTMA.PlayerService.Player.viewingDoor = 'west';
        boardElement.west.room.type = 'WIN_ROOM';
        expect(OTMA.PlayerService.states.ROOM.movePlayer('south', boardElement)).toBeFalsy();
    });

    it("should use the current players board element when the general move method is called", function() {
        OTMA.PlayerService.Player.coordinate = 'initial';
        OTMA.PlayerService.currentState = OTMA.PlayerService.states.MAP;
        OTMA.PlayerService.states.MAP.movePlayer = function(direction, element) {
            expect(direction).toBe('myDirection');
            expect(element).toBe(boardElement);
        };

        OTMA.PlayerService.movePlayer('myDirection');
    });


});