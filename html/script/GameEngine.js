/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

/**
 * @class
 */
OTMA.GameEngine = {
    /**
     * State is one of [RECEPTION, MAP, DOOR, ROOM]
     */
    state: 'MAP',

    /**
     * Hints that can be found in the game. This is loaded by using OTMA.xmlContent.
     */
    hints: [],

    /**
     * Get the current board element for the human player.
     * @return {OTMA.domain.BoardElement} current board element.
     */
    getCurrentBoardElement: function() {
        var currentCoordinate = OTMA.PlayerService.INSTANCE.Player.coordinate;
        return OTMA.Board.INSTANCE.boardElements[currentCoordinate];
    },

    /**
     * Set the global game engine state. This triggers the 'stateChange' event.
     * @param {String} newState new state to set
     */
    setState: function(newState) {
        OTMA.GameEngine.state = newState;
        $(document).trigger('stateChange', newState);
    },

    /**
     * Move the player. The method delegates to the PlayerService.
     * @param {String} direction direction to move the player
     */
    movePlayer: function(direction) {
        OTMA.PlayerService.INSTANCE.movePlayer(direction);
    },

    /**
     * Check whether all win conditions have been fulfilled.
     * @return {Boolean} true if all win conditions have been fulfilled, else false
     */
    checkWinConditions: function() {
        var player = OTMA.PlayerService.INSTANCE.Player;
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
    OTMA.GameEngine.hints = OTMA.XML.hints;
    $(document).bind('playerMove', winListener )
}