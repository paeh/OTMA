/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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