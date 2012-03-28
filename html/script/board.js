OTMA.Board = {
    boardElements: {},
    getRandomBoardElement: function() {
        var coordinates = OTMA.Board.getCoordinatesArray();
        var randomNumber = Math.floor(Math.random() * coordinates.length);

        return OTMA.Board.boardElements[coordinates[randomNumber]];
    },
    getCoordinatesArray: function() {
        var coordinates = [];
        for (var coordinate in OTMA.Board.boardElements) {
            if (OTMA.Board.boardElements.hasOwnProperty(coordinate)) {
                coordinates.push(coordinate);
            }
        }
        return coordinates;
    },
    getBoardElementsInAvailableDirections: function(boardElement) {
        var directions = [];
        if (boardElement.south) directions.push(boardElement.south);
        if (boardElement.north) directions.push(boardElement.north);
        if (boardElement.east) directions.push(boardElement.east);
        if (boardElement.west) directions.push(boardElement.west);

        return directions;
    },
    createBoardElement: function(picture, coordinate) {
        OTMA.Board.boardElements[coordinate] = {
            picture: picture,
            coordinate: coordinate
        };
    },
    setNavigationBorders: function(coordinate, north, east, south, west) {
        var boardItem = OTMA.Board.boardElements[coordinate];
        if (! boardItem) return;

        var northMapItem = OTMA.Board.boardElements[north];
        var southMapItem = OTMA.Board.boardElements[south];
        var westMapItem = OTMA.Board.boardElements[west];
        var eastMapItem = OTMA.Board.boardElements[east];

        $.extend(boardItem, {
            north: northMapItem,
            south: southMapItem,
            east: eastMapItem,
            west: westMapItem,
            type: 'MAP'
        });
    },
    setRoomToRandomDoor: function(doors, room) {

        do {
            var randomNumber = Math.floor(Math.random() * doors.length);
            var door = doors[randomNumber];

            if (door) {
                door['room'] = room;
                room['door'] = door;

                delete doors[randomNumber];
            }

        } while(! door);

        return door;
    },
    setRandomDoorsToXMLEvents: function(availableDoors) {
        $.each(OTMA.xmlContent.events, function(index, event) {
            var door = OTMA.Board.setRoomToRandomDoor(availableDoors, event);
            OTMA.Board.boardElements[door.coordinate][door.direction] = door;
        });
    }
};

function initialiseBoard() {
    var doors = [{
        coordinate: '1x2',
        direction: 'north'
    }, {
        coordinate: '1x5',
        direction: 'south'
    }, {
        coordinate: '2x1',
        direction: 'west'
    }, {
        coordinate: '2x2',
        direction: 'east'
    }, {
        coordinate: '2x4',
        direction: 'west'
    }, {
        coordinate: '2x5',
        direction: 'north'
    }, {
        coordinate: '3x1',
        direction: 'east'
    }, {
        coordinate: '3x2',
        direction: 'north'
    }, {
        coordinate: '3x4',
        direction: 'south'
    }, {
        coordinate: '3x5',
        direction: 'east'
    }, {
        coordinate: '4x1',
        direction: 'west'
    }, {
        coordinate: '4x3',
        direction: 'east'
    }, {
        coordinate: '4x4',
        direction: 'north'
    }, {
        coordinate: '5x2',
        direction: 'north'
    }, {
        coordinate: '5x5',
        direction: 'west'
    }];

    OTMA.Board.createBoardElement("1x1.png", "1x1");
    OTMA.Board.createBoardElement("1x2.png", "1x2");
    OTMA.Board.createBoardElement("1x3.png", "1x3");
    OTMA.Board.createBoardElement("1x4.png", "1x4");
    OTMA.Board.createBoardElement("1x5.png", "1x5");

    OTMA.Board.createBoardElement("2x1.png", "2x1");
    OTMA.Board.createBoardElement("2x2.png", "2x2");
    OTMA.Board.createBoardElement("2x3.png", "2x3");
    OTMA.Board.createBoardElement("2x4.png", "2x4");
    OTMA.Board.createBoardElement("2x5.png", "2x5");

    OTMA.Board.createBoardElement("3x1.png", "3x1");
    OTMA.Board.createBoardElement("3x2.png", "3x2");
    OTMA.Board.createBoardElement("3x3.png", "3x3");
    OTMA.Board.createBoardElement("3x4.png", "3x4");
    OTMA.Board.createBoardElement("3x5.png", "3x5");

    OTMA.Board.createBoardElement("4x1.png", "4x1");
    OTMA.Board.createBoardElement("4x2.png", "4x2");
    OTMA.Board.createBoardElement("4x3.png", "4x3");
    OTMA.Board.createBoardElement("4x4.png", "4x4");
    OTMA.Board.createBoardElement("4x5.png", "4x5");

    OTMA.Board.createBoardElement("5x1.png", "5x1");
    OTMA.Board.createBoardElement("5x2.png", "5x2");
    OTMA.Board.createBoardElement("5x3.png", "5x3");
    OTMA.Board.createBoardElement("5x4.png", "5x4");
    OTMA.Board.createBoardElement("5x5.png", "5x5");

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

    OTMA.Board.setNavigationBorders("4x1", "3x1", "4x2", "5x1", "undefined");
    OTMA.Board.setNavigationBorders("4x2", "3x2", "4x3", undefined, "4x1");
    OTMA.Board.setNavigationBorders("4x3", undefined, undefined, "5x3", "4x2");
    OTMA.Board.setNavigationBorders("4x4", undefined, "4x5", "5x4", undefined);
    OTMA.Board.setNavigationBorders("4x5", "3x5", undefined, "5x5", "4x4");

    OTMA.Board.setNavigationBorders("5x1", "4x1", "5x2", undefined, undefined);
    OTMA.Board.setNavigationBorders("5x2", undefined, "5x3", undefined, "5x1");
    OTMA.Board.setNavigationBorders("5x3", "4x3", "5x4", undefined, "5x2");
    OTMA.Board.setNavigationBorders("5x4", "4x4", undefined, undefined, "5x3");
    OTMA.Board.setNavigationBorders("5x5", "4x5", undefined, undefined, undefined);

    OTMA.Board.setRandomDoorsToXMLEvents(doors);
}

