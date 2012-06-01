/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

/**
 * PlayerService implements all attributes and methods to handle player interactions and player states within the
 * game. Usually, do not instantiate the class but use the singleton INSTANCE object.
 * @class
 */
OTMA.PlayerService = function() {
    var that = this;

    /**
     * Main Player
     * @type {OTMA.domain.HumanPlayer}
     */
    this.Player = new OTMA.domain.HumanPlayer('1x1');

    /**
     * Current state. One of {MAP, DOOR, ROOM}
     * @type {String}
     */
    this.currentState = {};

    /**
     * Available states
     * @type {Object}
     */
    this.states = {
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
                    OTMA.PlayerService.INSTANCE.Player.viewingDoor = directionProperty;
                    OTMA.GameEngine.setState('DOOR');
                } else {
                    that.Player.coordinate = directionMapItem.coordinate;
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
                var door = currentMapItem[that.Player.viewingDoor];

                // block player from walking into a door that does not have a room assigned to it
                if (directionProperty == 'north' && ! door.room) return false;

                // block door if viewing win door and not having found all hints yet
                if (directionProperty == 'north' && ! that.Player.viewingRoom && door.room.type=='WIN_ROOM'
                    && ! OTMA.GameEngine.checkWinConditions()) return false;

                if (directionProperty == 'north') {
                    OTMA.GameEngine.setState('ROOM');
                    that.Player.viewingRoom = true;
                } else if (directionProperty == 'south') {
                    OTMA.GameEngine.setState('MAP');
                    that.Player.viewingDoor = undefined;
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
                var door = currentMapItem[that.Player.viewingDoor];
                var room = door.room;

                if (room.type == 'WIN_ROOM') return false;

                if (directionProperty != 'south') return false;
                OTMA.GameEngine.setState('DOOR');
                return true;
            }
        }
    };

    /**
     * Move a player into a given direction. This method also has to decide on which movePlayer method to call based on
     * the current PlayerService state.
     * @param {String} directionProperty direction to move the player.
     */
    this.movePlayer = function(directionProperty) {
        if (! that.currentState) return;

        var currentCoordinate = that.Player.coordinate;
        var currentMapItem = OTMA.Board.INSTANCE.boardElements[currentCoordinate];

        that.currentState.movePlayer(directionProperty, currentMapItem);
        $(document).trigger('playerMove');
    }
};
OTMA.PlayerService.INSTANCE = new OTMA.PlayerService();

function initialisePlayerService() {
    var playerService = OTMA.PlayerService.INSTANCE;
    $(document).bind('stateChange', function(event, newState) {
        playerService.currentState = playerService.states[newState];
    });
    playerService.currentState = playerService.states[OTMA.Constants.DEFAULT_STATE];


    $(document).bind('npcFound', function(event, npc) {
        playerService.Player.addFoundNPC(npc);
    });

    $(document).bind('hintFound', function(event, hint) {
        playerService.Player.addFoundHint(hint);
    });
}