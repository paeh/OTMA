/**
 * OTMA.Engine.state is one of [RECEPTION, MAP, DOOR, ROOM]
 */
OTMA.Engine = {
    state: 'MAP',
    hints: [],
    Player: {
        coordinate: '1x1',
        foundHints: [],
        foundNPC: []
    },
    getCurrentBoardElement: function() {
        var currentCoordinate = OTMA.Engine.Player.coordinate;
        return OTMA.Board.boardElements[currentCoordinate];
    },

    getRandomRoomHint: function() {
        var hints = OTMA.Engine.hints;
        var randomHintNumber = OTMA.util.getRandomInteger(hints.length);

        var hint = hints[randomHintNumber];
        if ($.inArray(OTMA.Engine.Player.foundHints, hint) == -1) {
           OTMA.Engine.Player.foundHints.push(hint);
        }

        return hint;
    },

    setState: function(newState) {
        OTMA.Engine.state = newState;
        $(document).trigger('stateChange', newState);
    }
};

function initialiseEngine() {
    OTMA.Engine.hints = OTMA.xmlContent.hints;
}