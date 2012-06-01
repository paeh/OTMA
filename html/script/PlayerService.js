/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

/**
 * PlayerService implements all attributes and methods to handle player interactions and player states within the
 * game.
 * @type {Object}
 */
OTMA.PlayerService = {
    Player: new OTMA.domain.HumanPlayer('1x1'),

    /**
     * Current state. One of {MAP, DOOR, ROOM}
     */
    currentState: {},
    states: {
        MAP: {
            /**
             * Move the player from it's current board element to a given direction.
             * @param {String} directionProperty direction to move the player
             * @param {OTMA.domain.BoardElement} currentMapItem current position of the player on the map.
             */
            movePlayer: function(directionProperty, currentMapItem) {
                var directionMapItem = currentMapItem[directionProperty];
                if (! directionMapItem) return false;

                if (directionMapItem.type == 'DOOR') {
                    OTMA.PlayerService.Player.viewingDoor = directionProperty;
                    OTMA.GameEngine.setState('DOOR');
                } else {
                    OTMA.PlayerService.Player.coordinate = directionMapItem.coordinate;
                }
                return true;
            }
        },
        DOOR: {
            /**
             * Move the player from it's current board element to a given direction.
             * Watch out! This also has to handle moving into win-doors / rooms.
             * @param  {String} directionProperty direction to move the player
             * @param {OTMA.domain.BoardElement} currentMapItem current position of the player on the map.
             */
            movePlayer: function(directionProperty, currentMapItem) {
                var door = currentMapItem[OTMA.PlayerService.Player.viewingDoor];

                // block player from walking into a door that does not have a room assigned to it
                if (directionProperty == 'north' && ! door.room) return false;

                // block door if viewing win door and not having found all hints yet
                if (directionProperty == 'north' && ! OTMA.PlayerService.Player.viewingRoom && door.room.type=='WIN_ROOM'
                    && ! OTMA.GameEngine.checkWinConditions()) return false;

                if (directionProperty == 'north') {
                    OTMA.GameEngine.setState('ROOM');
                    OTMA.PlayerService.Player.viewingRoom = true;
                } else if (directionProperty == 'south') {
                    OTMA.GameEngine.setState('MAP');
                    OTMA.PlayerService.Player.viewingDoor = undefined;
                }
                return true;
            }
        },
        ROOM: {
            /**
             * Move the player from it's current board element to a given direction.
             * @param {String} directionProperty direction to move the player
             * @param {OTMA.domain.BoardElement} currentMapItem current position of the player on the map.
             */
            movePlayer: function(directionProperty, currentMapItem) {
                var door = currentMapItem[OTMA.PlayerService.Player.viewingDoor];
                var room = door.room;

                if (room.type == 'WIN_ROOM') return false;

                if (directionProperty != 'south') return false;
                OTMA.GameEngine.setState('DOOR');
                return true;
            }
        }
    },

    /**
     * Move a player into a given direction. This method also has to decide on which movePlayer method to call based on
     * the current PlayerService state.
     * @param {String} directionProperty direction to move the player.
     */
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
        OTMA.PlayerService.Player.addFoundNPC(npc);
    });

    $(document).bind('hintFound', function(event, hint) {
        OTMA.PlayerService.Player.addFoundHint(hint);
    });
}