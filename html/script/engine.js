OTMA.Engine = {
    Player: {
        coordinate: '1x1',
        foundHints: [],
        foundNPC: []
    },
    getCurrentBoardElement: function() {
        var currentCoordinate = OTMA.Engine.Player.coordinate;
        return OTMA.Board.boardElements[currentCoordinate];
    }
};

function initialiseEngine() {
}