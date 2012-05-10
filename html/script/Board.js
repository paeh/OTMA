/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

/**
 * JavaScript object implementing all functionality for the Board domain object.
 */
OTMA.Board = {
    /**
     * Map of all board elements. Key is a coordinate, value a BoardElement.
     */
    boardElements: {},

    /**
     * Resets the board by deleting all saved board elements.
     */
    reset:function() {
        OTMA.Board.boardElements = {}
    },

    /**
     * Finds out some random board element.
     * @return {*} random board element
     */
    getRandomBoardElement: function() {
        var coordinates = OTMA.Board.getCoordinatesArray();
        var randomNumber = OTMA.util.getRandomInteger(coordinates.length);

        return OTMA.Board.boardElements[coordinates[randomNumber]];
    },

    /**
     * Calculates an array of all saved coordinates on the board.
     * @return {Array} all available coordinates.
     */
    getCoordinatesArray: function() {
        var coordinates = [];
        for (var coordinate in OTMA.Board.boardElements) {
            if (OTMA.Board.boardElements.hasOwnProperty(coordinate)) {
                coordinates.push(coordinate);
            }
        }
        return coordinates;
    },

    /**
     * Create a board element for a given coordinate and using a given background picture.
     * @param xCoordinate x-coordinate
     * @param yCoordinate y-coordinate
     * @return {Object} created board element
     */
    createBoardElement: function(xCoordinate, yCoordinate) {
        var coordinate = xCoordinate + "x" + yCoordinate;
        var picture = coordinate + ".png";

        var element = new OTMA.domain.BoardElement(picture, coordinate);
        OTMA.Board.boardElements[coordinate] = element;
        return element;
    },

    /**
     * Set adjacent board elements to a given board element.
     * @param coordinate coordinate of the board element, on which the adjacent board elements are set
     * @param north board element to the north
     * @param east board element to the east
     * @param south board element to the south
     * @param west board element to the west
     */
    setNavigationBorders: function(coordinate, north, east, south, west) {
        var boardItem = OTMA.Board.boardElements[coordinate];
        if (! boardItem) return;

        var northMapItem = OTMA.Board.boardElements[north];
        var southMapItem = OTMA.Board.boardElements[south];
        var westMapItem = OTMA.Board.boardElements[west];
        var eastMapItem = OTMA.Board.boardElements[east];

        boardItem.setNavigationBorders(northMapItem, eastMapItem, southMapItem, westMapItem);
    },

    /**
     * Set a room to some unknown, random door.
     * @param doors array of available doors.
     * @param room room to set
     * @return {*} found door, on which room is set
     */
    setRoomToRandomDoor: function(doors, room) {
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
    },

    /**
     * Associates all rooms from the XML content to random doors.
     * @param availableDoors
     */
    setRandomDoorsToXMLEvents: function(availableDoors) {
        $.each(OTMA.xmlContent.rooms, function(index, event) {
            var door = OTMA.Board.setRoomToRandomDoor(availableDoors, event);
            OTMA.Board.boardElements[door.boardElement.coordinate][door.direction] = door;
        });
    }
};

function initialiseBoard() {

    for (var i = 1; i <= OTMA.Constants.MAP_WIDTH; i++) {
        for (var j = 1; j <= OTMA.Constants.MAP_HEIGHT; j++) {
            OTMA.Board.createBoardElement(i, j);
        }
    }

    OTMA.Board.setNavigationBorders("1x1", undefined, undefined, "2x1", undefined);
    OTMA.Board.setNavigationBorders("1x2", undefined, "1x3", "2x2", undefined);
    OTMA.Board.setNavigationBorders("1x3", undefined, "1x4", "2x3", "1x2");
    OTMA.Board.setNavigationBorders("1x4", undefined, "1x5", undefined, "1x3");
    OTMA.Board.setNavigationBorders("1x5", undefined, undefined, undefined, "1x4");

    OTMA.Board.setNavigationBorders("2x1", "1x1", "2x2", "3x1", undefined);
    OTMA.Board.setNavigationBorders("2x2", "1x2", undefined, undefined, "2x1");
    OTMA.Board.setNavigationBorders("2x3", "1x3", undefined, "3x3", undefined);
    OTMA.Board.setNavigationBorders("2x4", undefined, "2x5", undefined, undefined);
    OTMA.Board.setNavigationBorders("2x5", undefined, undefined, "3x5", "2x4");

    OTMA.Board.setNavigationBorders("3x1", "2x1", undefined, "4x1", undefined);
    OTMA.Board.setNavigationBorders("3x2", undefined, "3x3", "4x2", undefined);
    OTMA.Board.setNavigationBorders("3x3", "2x3", "3x4", undefined, "3x2");
    OTMA.Board.setNavigationBorders("3x4", undefined, "3x5", undefined, "3x3");
    OTMA.Board.setNavigationBorders("3x5", "2x5", undefined, "4x5", "3x4");

    OTMA.Board.setNavigationBorders("4x1", "3x1", "4x2", "5x1", undefined);
    OTMA.Board.setNavigationBorders("4x2", "3x2", "4x3", undefined, "4x1");
    OTMA.Board.setNavigationBorders("4x3", undefined, undefined, "5x3", "4x2");
    OTMA.Board.setNavigationBorders("4x4", undefined, "4x5", "5x4", undefined);
    OTMA.Board.setNavigationBorders("4x5", "3x5", undefined, "5x5", "4x4");

    OTMA.Board.setNavigationBorders("5x1", "4x1", "5x2", undefined, undefined);
    OTMA.Board.setNavigationBorders("5x2", undefined, "5x3", undefined, "5x1");
    OTMA.Board.setNavigationBorders("5x3", "4x3", "5x4", undefined, "5x2");
    OTMA.Board.setNavigationBorders("5x4", "4x4", undefined, undefined, "5x3");
    OTMA.Board.setNavigationBorders("5x5", "4x5", undefined, undefined, undefined);

    OTMA.Board.doors = [
        new OTMA.domain.Door(OTMA.Board.boardElements["1x2"], 'north'),
        new OTMA.domain.Door(OTMA.Board.boardElements["1x5"], 'south'),
        new OTMA.domain.Door(OTMA.Board.boardElements["2x1"], 'west'),
        new OTMA.domain.Door(OTMA.Board.boardElements["2x2"], 'east'),
        new OTMA.domain.Door(OTMA.Board.boardElements["2x4"], 'west'),
        new OTMA.domain.Door(OTMA.Board.boardElements["2x5"], 'north'),
        new OTMA.domain.Door(OTMA.Board.boardElements["3x1"], 'east'),
        new OTMA.domain.Door(OTMA.Board.boardElements["3x2"], 'north'),
        new OTMA.domain.Door(OTMA.Board.boardElements["3x4"], 'south'),
        new OTMA.domain.Door(OTMA.Board.boardElements["3x5"], 'east'),
        new OTMA.domain.Door(OTMA.Board.boardElements["4x1"], 'west'),
        new OTMA.domain.Door(OTMA.Board.boardElements["4x3"], 'east'),
        new OTMA.domain.Door(OTMA.Board.boardElements["4x4"], 'north'),
        new OTMA.domain.Door(OTMA.Board.boardElements["5x2"], 'north'),
        new OTMA.domain.Door(OTMA.Board.boardElements["5x5"], 'west')
    ];

    OTMA.Board.setRandomDoorsToXMLEvents(OTMA.Board.doors);

    var winDoor = OTMA.Board.setRoomToRandomDoor(OTMA.Board.doors, {
        title: '!! YOU WIN !!',
        abbreviation: 'WIN',
        isWinDoor: true
    });
    winDoor.room.type = 'WIN_ROOM';
    OTMA.Board.boardElements[winDoor.boardElement.coordinate][winDoor.direction] = winDoor;

}

