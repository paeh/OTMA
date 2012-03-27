function loadBoard() {
    OTMA.Board = {
        boardElements: {}
    };

    OTMA.Board.createBoardElement = function(picture, coordinate) {
        OTMA.Board.boardElements[coordinate] = {
            picture: picture,
            coordinate: coordinate
        };
    };

    OTMA.Board.setNavigationBorders = function(coordinate, north, south, east, west) {
        var boardItem = OTMA.Board.boardElements[coordinate];
        if (! boardItem) return;

        $.extend(boardItem, {
            north: north,
            south: south,
            east: east,
            west: west
        });
    };

    OTMA.Board.createBoardElement("1x1.png", "1x1");
    OTMA.Board.createBoardElement("1x2.png", "1x2");

    OTMA.Board.setNavigationBorders("1x1", OTMA.Board.boardElements["1x2"], undefined, undefined, undefined)
}

