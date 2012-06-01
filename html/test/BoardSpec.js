/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

describe("OTMA.Board", function() {
    var board;
    beforeEach(function() {
        board = OTMA.Board.INSTANCE;
        board.reset();

        board.createBoardElement(1,1);
        board.createBoardElement(1,2);
        board.createBoardElement(1,3);
        board.createBoardElement(1,4);
        board.createBoardElement(1,5);
    });

    it("should be able to reset the board", function() {
        board.reset();
        expect(board.boardElements.size()).toBe(0);
    });

    it("should be possible to get a random board element", function() {
        for (var i = 0; i < 10; i++) {
            expect(board.getRandomBoardElement()).toBeDefined();
        }
    });

    it("should use the random number returned from the utility method to get the random board element", function() {
        OTMA.util.getRandomInteger = function() { return 1 };
        expect(board.getRandomBoardElement().coordinate).toBe('1x2');
    });

    it("should be possible to get an array containing all the board coordinates", function() {
        var coordinates = board.getCoordinatesArray();
        expect(coordinates.length).toBe(5);

        expect(coordinates).toContain('1x1');
        expect(coordinates).toContain('1x2');
        expect(coordinates).toContain('1x3');
        expect(coordinates).toContain('1x4');
        expect(coordinates).toContain('1x5');
    });

    it("should be possible to associate a room with a random door", function() {
        OTMA.util.getRandomInteger = function() { return 0 };

        var boardElement1x1 = new OTMA.domain.BoardElement('', '1x1');
        var boardElement1x2 = new OTMA.domain.BoardElement('', '1x2');
        var doors = [
            new OTMA.domain.Door(boardElement1x1, 'north'),
            new OTMA.domain.Door(boardElement1x2, 'north')
        ];
        var room = new OTMA.domain.Room('', '', '', [], []);

        var door = board.setRoomToRandomDoor(doors, room);

        expect(room.door).toBe(door);
        expect(door.room).toBe(room);

        expect(door.boardElement).toBe(boardElement1x1);
    })
});