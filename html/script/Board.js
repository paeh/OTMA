/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

/**
 * JavaScript object implementing all functionality for the Board domain object.
 * @class
 */
OTMA.Board = function(){
    var that = this;
    /**
     * Map of all board elements. Key is a coordinate, value a BoardElement.
     */
    this.boardElements = {};

    /**
     * Resets the board by deleting all saved board elements.
     */
    this.reset = function() {
        that.boardElements = {}
    };

    /**
     * Finds out some random board element.
     * @return {OTMA.domain.BoardElement} random board element
     */
    this.getRandomBoardElement = function() {
        var coordinates = that.getCoordinatesArray();
        var randomNumber = OTMA.util.getRandomInteger(coordinates.length);

        return that.boardElements[coordinates[randomNumber]];
    };

    /**
     * Calculates an array of all saved coordinates on the board.
     * @return {String[]} all available coordinates.
     */
    this.getCoordinatesArray = function() {
        var coordinates = [];
        for (var coordinate in that.boardElements) {
            if (that.boardElements.hasOwnProperty(coordinate)) {
                coordinates.push(coordinate);
            }
        }
        return coordinates;
    };

    /**
     * Create a board element for a given coordinate and using a given background picture.
     * @param {Integer} xCoordinate x-coordinate
     * @param {Integer} yCoordinate y-coordinate
     * @return {OTMA.domain.BoardElement} created board element
     */
    this.createBoardElement = function(xCoordinate, yCoordinate) {
        var coordinate = xCoordinate + "x" + yCoordinate;
        var picture = coordinate + ".png";

        var element = new OTMA.domain.BoardElement(picture, coordinate);
        that.boardElements[coordinate] = element;
        return element;
    };

    /**
     * Set adjacent board elements to a given board element.
     * @param {String} coordinate coordinate of the board element, on which the adjacent board elements are set
     * @param {String} north coordinate to the north
     * @param {String} east coordinate to the east
     * @param {String} south coordinate to the south
     * @param {String} west coordinate to the west
     */
    this.setNavigationBorders = function(coordinate, north, east, south, west) {
        var boardItem = that.boardElements[coordinate];
        if (! boardItem) return;

        var northMapItem = that.boardElements[north];
        var southMapItem = that.boardElements[south];
        var westMapItem = that.boardElements[west];
        var eastMapItem = that.boardElements[east];

        boardItem.setNavigationBorders(northMapItem, eastMapItem, southMapItem, westMapItem);
    };

    /**
     * Set a room to some unknown, random door.
     * @param {OTMA.domain.Door[]} doors array of available doors.
     * @param {OTMA.domain.Room} room room to set
     * @return {OTMA.domain.Door} found door, on which room is set
     */
    this.setRoomToRandomDoor = function(doors, room) {
        do {
            var randomNumber = OTMA.util.getRandomInteger(doors.length);
            var door = doors[randomNumber];

            if (door) {
                door.setRoom(room);
                room['door'] = door;
                room['type'] = 'ROOM';

                delete doors[randomNumber];
            }

        } while(! door);

        return door;
    };

    /**
     * Associates all rooms from the XML content to random doors.
     * @param {OTMA.domain.Door[]} availableDoors
     */
    this.setRandomDoorsToXMLEvents = function(availableDoors) {
        $.each(OTMA.XML.rooms, function(index, event) {
            var door = that.setRoomToRandomDoor(availableDoors, event);
            that.boardElements[door.boardElement.coordinate][door.direction] = door;
        });
    };
};
OTMA.Board.INSTANCE = new OTMA.Board();


function initialiseBoard() {
    var board = OTMA.Board.INSTANCE;

    for (var i = 1; i <= OTMA.Constants.MAP_WIDTH; i++) {
        for (var j = 1; j <= OTMA.Constants.MAP_HEIGHT; j++) {
            board.createBoardElement(i, j);
        }
    }

    board.setNavigationBorders("1x1", undefined, undefined, "2x1", undefined);
    board.setNavigationBorders("1x2", undefined, "1x3", "2x2", undefined);
    board.setNavigationBorders("1x3", undefined, "1x4", "2x3", "1x2");
    board.setNavigationBorders("1x4", undefined, "1x5", undefined, "1x3");
    board.setNavigationBorders("1x5", undefined, undefined, undefined, "1x4");

    board.setNavigationBorders("2x1", "1x1", "2x2", "3x1", undefined);
    board.setNavigationBorders("2x2", "1x2", undefined, undefined, "2x1");
    board.setNavigationBorders("2x3", "1x3", undefined, "3x3", undefined);
    board.setNavigationBorders("2x4", undefined, "2x5", undefined, undefined);
    board.setNavigationBorders("2x5", undefined, undefined, "3x5", "2x4");

    board.setNavigationBorders("3x1", "2x1", undefined, "4x1", undefined);
    board.setNavigationBorders("3x2", undefined, "3x3", "4x2", undefined);
    board.setNavigationBorders("3x3", "2x3", "3x4", undefined, "3x2");
    board.setNavigationBorders("3x4", undefined, "3x5", undefined, "3x3");
    board.setNavigationBorders("3x5", "2x5", undefined, "4x5", "3x4");

    board.setNavigationBorders("4x1", "3x1", "4x2", "5x1", undefined);
    board.setNavigationBorders("4x2", "3x2", "4x3", undefined, "4x1");
    board.setNavigationBorders("4x3", undefined, undefined, "5x3", "4x2");
    board.setNavigationBorders("4x4", undefined, "4x5", "5x4", undefined);
    board.setNavigationBorders("4x5", "3x5", undefined, "5x5", "4x4");

    board.setNavigationBorders("5x1", "4x1", "5x2", undefined, undefined);
    board.setNavigationBorders("5x2", undefined, "5x3", undefined, "5x1");
    board.setNavigationBorders("5x3", "4x3", "5x4", undefined, "5x2");
    board.setNavigationBorders("5x4", "4x4", undefined, undefined, "5x3");
    board.setNavigationBorders("5x5", "4x5", undefined, undefined, undefined);

    board.doors = [
        new OTMA.domain.Door(board.boardElements["1x2"], 'north'),
        new OTMA.domain.Door(board.boardElements["1x5"], 'south'),
        new OTMA.domain.Door(board.boardElements["2x1"], 'west'),
        new OTMA.domain.Door(board.boardElements["2x2"], 'east'),
        new OTMA.domain.Door(board.boardElements["2x4"], 'west'),
        new OTMA.domain.Door(board.boardElements["2x5"], 'north'),
        new OTMA.domain.Door(board.boardElements["3x1"], 'east'),
        new OTMA.domain.Door(board.boardElements["3x2"], 'north'),
        new OTMA.domain.Door(board.boardElements["3x4"], 'south'),
        new OTMA.domain.Door(board.boardElements["3x5"], 'east'),
        new OTMA.domain.Door(board.boardElements["4x1"], 'west'),
        new OTMA.domain.Door(board.boardElements["4x3"], 'east'),
        new OTMA.domain.Door(board.boardElements["4x4"], 'north'),
        new OTMA.domain.Door(board.boardElements["5x2"], 'north'),
        new OTMA.domain.Door(board.boardElements["5x5"], 'west')
    ];

    $.each(board.doors, function(index, door) {
        var boardElement = door.boardElement;
        board.boardElements[boardElement.coordinate][door.direction] = door;
    });

    board.setRandomDoorsToXMLEvents(board.doors);

    var winDoor = board.setRoomToRandomDoor(board.doors, new OTMA.domain.Room('You Win!', 'You Win', 'You Win', [], []));
    winDoor.room.type = 'WIN_ROOM';

    board.boardElements[winDoor.boardElement.coordinate][winDoor.direction] = winDoor;
}

