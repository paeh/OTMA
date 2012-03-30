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
                if (direction != 'south') return;
                OTMA.GameEngine.setState('DOOR');
            }
        }
    },

    movePlayer: function(directionProperty) {
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
        var foundNPC = OTMA.PlayerService.Player.foundNPC;
        if ($.inArray(npc, foundNPC) == -1) {
            foundNPC.push(npc);
        }
    });

    $(document).bind('hintFound', function(event, hint) {
        var foundHints = OTMA.PlayerService.Player.foundHints;
        if ($.inArray(foundHints, hint) == -1) {
            foundHints.push(hint);
        }
    })
}