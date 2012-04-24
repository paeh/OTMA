/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

describe("OTMA.Board", function() {
    beforeEach(function() {
        OTMA.Board.reset();

        OTMA.Board.createBoardElement("1x1.png", "1x1");
        OTMA.Board.createBoardElement("1x2.png", "1x2");
        OTMA.Board.createBoardElement("1x3.png", "1x3");
        OTMA.Board.createBoardElement("1x4.png", "1x4");
        OTMA.Board.createBoardElement("1x5.png", "1x5");
    });

    it("should be able to reset the board", function() {
        OTMA.Board.reset();
        expect(OTMA.Board.boardElements.size()).toBe(0);
    });

    it("should be possible to get a random board element", function() {
        for (var i = 0; i < 10; i++) {
            expect(OTMA.Board.getRandomBoardElement()).toBeDefined();
        }
    });

    it("should use the random number returned from the utility method to get the random board element", function() {
        OTMA.util.getRandomInteger = function() { return 1 };
        expect(OTMA.Board.getRandomBoardElement().coordinate).toBe('1x2');
    });

    it("should be possible to get an array containing all the board coordinates", function() {
        var coordinates = OTMA.Board.getCoordinatesArray();
        expect(coordinates.length).toBe(5);

        expect(coordinates).toContain('1x1');
        expect(coordinates).toContain('1x2');
        expect(coordinates).toContain('1x3');
        expect(coordinates).toContain('1x4');
        expect(coordinates).toContain('1x5');
    });

    it("should be able to return all the available board directions from a given board element", function() {
        var element = OTMA.Board.createBoardElement("1x1.png", "1x1");
        element.west = OTMA.Board.createBoardElement("1x1.png", "1x2");
        element.north = OTMA.Board.createBoardElement("1x1.png", "1x3");

        var directionElements = OTMA.Board.getBoardElementsInAvailableDirections(element);

        expect(directionElements.length).toBe(2);
        expect(directionElements).toContain(element.west);
        expect(directionElements).toContain(element.north);
    });

    it("should be possible to associate a room with a random door", function() {
        OTMA.util.getRandomInteger = function() { return 0 };

        var doors = [{
            coordinate: '1x1'
        }, {
            coordinate: '1x2'
        }];
        var room = {};

        var door = OTMA.Board.setRoomToRandomDoor(doors, room);

        expect(room.door).toBe(door);
        expect(door.room).toBe(room);

        expect(door.coordinate).toBe('1x1');
    })
});