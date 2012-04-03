OTMA.GameEngine = {
    /**
     * State is one of [RECEPTION, MAP, DOOR, ROOM]
     */
    state: 'MAP',
    hints: [],
    stories: [{
        title: 'Bla1',
        text: 'Bla1'
    }, {
        title: 'Bla2',
        text: 'Bla2'
    }, {
        title: 'Bla3',
        text: 'Bla3'
    }],

    getCurrentBoardElement: function() {
        var currentCoordinate = OTMA.PlayerService.Player.coordinate;
        return OTMA.Board.boardElements[currentCoordinate];
    },

    getRandomRoomContent: function() {
        var rand = OTMA.util.getRandomInteger(4);
        if (rand == 1) {
            return OTMA.GameEngine.getRandomRoomHint();
        } else {
            return OTMA.GameEngine.getRandomRoomStory();
        }
    },

    getRandomRoomStory: function() {
        var stories = OTMA.GameEngine.stories;
        var randomHintNumber = OTMA.util.getRandomInteger(stories.length);

        return stories[randomHintNumber];
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