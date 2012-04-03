OTMA.GameEngine = {
    /**
     * State is one of [RECEPTION, MAP, DOOR, ROOM]
     */
    state: 'MAP',
    hints: [],

    getCurrentBoardElement: function() {
        var currentCoordinate = OTMA.PlayerService.Player.coordinate;
        return OTMA.Board.boardElements[currentCoordinate];
    },

    getRandomRoomHint: function() {
        var hints = OTMA.GameEngine.hints;
        var randomHintNumber = OTMA.util.getRandomInteger(hints.length);

        var hint = hints[randomHintNumber];
        $(document).trigger('hintFound', hint);

        return hint;
    },

    setState: function(newState) {
        OTMA.GameEngine.state = newState;
        $(document).trigger('stateChange', newState);
    },

    movePlayer: function(direction) {
        OTMA.PlayerService.movePlayer(direction);
    },

    checkWinConditions: function() {
        var player = OTMA.PlayerService.Player;
        return player.foundHints.length >= OTMA.Constants.WIN_HINT_COUNT &&
            player.foundNPC.length >= OTMA.Constants.WIN_NPC_COUNT;
    }
};

function initialiseGameEngine() {
    var winListener = function() {
        if (OTMA.GameEngine.checkWinConditions()) {
            $(document).trigger('meetsWinCondition');
            $(document).unbind('playerMove', winListener);
        }
    };
    OTMA.GameEngine.hints = OTMA.xmlContent.hints;
    $(document).bind('playerMove', winListener )
}