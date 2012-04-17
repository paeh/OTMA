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

OTMA.PlayerService = {
    Player: {
        coordinate: '1x1',
        foundHints: [],
        foundNPC: []
    },

    currentState: {},
    states: {
        MAP: {
            movePlayer: function(directionProperty, currentMapItem) {
                var directionMapItem = currentMapItem[directionProperty];
                if (! directionMapItem) return;

                OTMA.PlayerService.Player.coordinate = directionMapItem.coordinate;

                if (directionMapItem.type == 'DOOR') {
                    OTMA.PlayerService.Player.viewingDoor = directionProperty;
                    OTMA.GameEngine.setState('DOOR');
                }
            }
        },
        DOOR: {
            movePlayer: function(directionProperty) {
                var door = OTMA.GameEngine.getCurrentBoardElement()[OTMA.PlayerService.Player.viewingDoor];

                // block player from walking back when being within the win room
                if (directionProperty == 'south' && OTMA.PlayerService.Player.viewingRoom && door.room.type=='WIN_ROOM'
                    && OTMA.GameEngine.checkWinConditions()) return;

                // block door if viewing win door and not having found all hints yet
                if (directionProperty == 'north' && ! OTMA.PlayerService.Player.viewingRoom && door.room.type=='WIN_ROOM'
                    && ! OTMA.GameEngine.checkWinConditions()) return;

                if (directionProperty == 'north') {
                    OTMA.GameEngine.setState('ROOM');
                    OTMA.PlayerService.Player.viewingRoom = true;
                } else if (directionProperty == 'south') {
                    OTMA.GameEngine.setState('MAP');
                    OTMA.PlayerService.Player.viewingDoor = undefined;
                }
            }
        },
        ROOM: {
            movePlayer: function(direction) {
                var door = OTMA.GameEngine.getCurrentBoardElement()[OTMA.PlayerService.Player.viewingDoor];
                var room = door.room;

                if (room.type == 'WIN_ROOM') return;

                if (direction != 'south') return;
                OTMA.GameEngine.setState('DOOR');
            }
        }
    },

    movePlayer: function(directionProperty) {
        if (! OTMA.PlayerService.currentState) return;

        var currentCoordinate = OTMA.PlayerService.Player.coordinate;
        var currentMapItem = OTMA.Board.boardElements[currentCoordinate];

        OTMA.PlayerService.currentState.movePlayer(directionProperty, currentMapItem);
        $(document).trigger('playerMove');
    }
};

function initialisePlayerService() {
    $(document).bind('stateChange', function(event, newState) {
        OTMA.PlayerService.currentState = OTMA.PlayerService.states[newState];
    });
    OTMA.PlayerService.currentState = OTMA.PlayerService.states[OTMA.Constants.DEFAULT_STATE];


    $(document).bind('npcFound', function(event, npc) {
        OTMA.util.addToArrayIfNotContained(OTMA.PlayerService.Player.foundNPC, npc);
    });

    $(document).bind('hintFound', function(event, hint) {
        OTMA.util.addToArrayIfNotContained(OTMA.PlayerService.Player.foundHints, hint);
    })
}