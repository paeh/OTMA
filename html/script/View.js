OTMA.View = {
    states: {

        MAP: {
            updateButtons: function(mapItem) {
                var player = OTMA.PlayerService.Player;
                OTMA.View.disableButtonsBasedOnDirections(mapItem);
            },
            updateNPCView: function() {
                var currentBoardElement = OTMA.GameEngine.getCurrentBoardElement();
                var npc = OTMA.NPCService.getNPCForBoardElement(currentBoardElement);
                if (npc && OTMA.GameEngine.state == 'MAP') {
                    $('#npcImage').attr('src', 'images/avatars/' + npc.picture);
                } else {
                    $('#npcImage').attr('src', 'images/blank.png');
                }
            },
            updateBackground: function(currentMapItem) {
                OTMA.View.setBackground('images/map/' + currentMapItem.picture);
            },
            showNPCConversation: function() {
                var currentBoardElement = OTMA.GameEngine.getCurrentBoardElement();
                var npc = OTMA.NPCService.getNPCForBoardElement(currentBoardElement);

                if (! npc) return;

                $('#conversation div.conversationTitle').html(npc.name);
                $('#conversation div.conversationSubTitle').html(npc.title);
                $('#conversation div.conversationText').html(npc.introduction);

                OTMA.util.setCSSVisibilityOnElement('#conversationHolder', true);

                $(document).trigger('npcFound', npc);
            }
        },

        DOOR: {
            updateButtons: function(currentMapItem) {
                var door = currentMapItem[OTMA.PlayerService.Player.viewingDoor];
                var mapItem = { south: 'south', north: 'north' };
                if (! OTMA.GameEngine.checkWinConditions() && door.room.type == 'WIN_ROOM') {
                    mapItem.north = undefined;
                }
                OTMA.View.disableButtonsBasedOnDirections(mapItem);
            },
            updateBackground: function(currentMapItem) {
                var abbreviation = currentMapItem[OTMA.PlayerService.Player.viewingDoor].room.abbreviation;
                $('#doorDescriptionHolder div.doorDescription').html(abbreviation);
                OTMA.View.setBackground('images/door.png');
                OTMA.util.setCSSVisibilityOnElement('#doorDescriptionHolder', true);
            },
            updateNPCView: function() {
                $('#npcImage').attr('src', 'images/blank.png');
            }
        },

        ROOM: {
            updateButtons: function(currentMapItem) {
                var door = currentMapItem[OTMA.PlayerService.Player.viewingDoor];
                var room = door.room;

                var mapItem = { south: 'south' };
                if (room.type == 'WIN_ROOM') {
                   mapItem = {};
                }
                OTMA.View.disableButtonsBasedOnDirections(mapItem);
            },
            updateBackground: function(currentMapItem) {
                var door = currentMapItem[OTMA.PlayerService.Player.viewingDoor];

                if (door.room.type == 'WIN_ROOM') {
                    OTMA.View.setBackground('images/champion.png');
                } else {
                    OTMA.View.setBackground('images/room.png');
                    OTMA.View.currentState.showRoomContent(door.room);
                    OTMA.util.setCSSVisibilityOnElement('#roomHolder', true);

                    $('#roomHolder div.roomTitle').html(door.room.title);
                }
            },
            showRoomContent: function(room) {
                if (OTMA.GameEngine.state != 'ROOM') {
                    return;
                }

                $('#roomHolder div.roomDescription').html(room.description);

                var content = OTMA.GameEngine.getRandomRoomContent();

                $('#roomHolder div.roomContent div.title').html(content.title);
                $('#roomHolder div.roomContent div.text').html(content.text);

                $('#roomHolder div.roomContent').delay(OTMA.Constants.ROOM_CONTENT_TIME).queue(function(next) {
                    OTMA.View.states.ROOM.showRoomContent(room);
                    next();
                });
            },
            updateNPCView: function() {
                $('#npcImage').attr('src', 'images/blank.png');
            }
        },
        RECEPTION: {
            updateButtons: function() {
                // disable all buttons!
                OTMA.View.disableButtonsBasedOnDirections({});
            },
            updateBackground: function() {
                OTMA.View.setBackground('images/reception.png');
                OTMA.util.setCSSVisibilityOnElement('#receptionHolder', true);
            },
            updateNPCView: function() {
                $('#npcImage').attr('src', 'images/blank.png');
            }
        }
    },
    currentState: {},

    update: function() {
        var player = OTMA.PlayerService.Player;
        var mapItem = OTMA.Board.boardElements[player.coordinate];

        $.each($('div.holder'), function(index, element) {
            OTMA.util.setCSSVisibilityOnElement('#' + element.id, false);
        });

        OTMA.View.currentState.updateNPCView();
        OTMA.View.currentState.updateButtons(mapItem);
        OTMA.View.currentState.updateBackground(mapItem);

        if (OTMA.View.currentState.update) {
            OTMA.View.currentState.update();
        }
    },

    disableButtonIfNavigationIsUndefined: function(mapItem, property, buttonId) {
        if (mapItem[property] == undefined) {
            $(buttonId).attr('disabled', true);
            $(buttonId).attr('src', 'images/grey_' + property + '.png');
        } else {
            $(buttonId).attr('disabled', false);
            $(buttonId).attr('src', 'images/white_' + property + '.png');
        }
    },

    disableButtonsBasedOnDirections: function(mapItem) {
        OTMA.View.disableButtonIfNavigationIsUndefined(mapItem, 'north', '#north');
        OTMA.View.disableButtonIfNavigationIsUndefined(mapItem, 'south', '#south');
        OTMA.View.disableButtonIfNavigationIsUndefined(mapItem, 'west', '#west');
        OTMA.View.disableButtonIfNavigationIsUndefined(mapItem, 'east', '#east');
    },

    updateButtons: function() {
        OTMA.View.currentState.updateButtons();
    },

    setBackground: function(picture) {
        $('#backgroundImage').attr('src', picture);
    },

    toggleNPCConversation: function() {
        if ($('#conversation').css('visibility') == 'hidden') {
            OTMA.View.showNPCConversation();
        } else {
            OTMA.View.hideNPCConversation();
        }
    },

    showNPCConversation: function() {
        if (OTMA.View.currentState.showNPCConversation) {
            OTMA.View.currentState.showNPCConversation();
        }
    },

    hideNPCConversation: function() {
        OTMA.util.setCSSVisibilityOnElement('#conversationHolder', false);
    }
};


function initialiseView() {

    OTMA.View.currentState = OTMA.View.states[OTMA.Constants.DEFAULT_STATE];

    $(document).bind('stateChange', function(event, newState) {
        OTMA.View.currentState = OTMA.View.states[newState];
        OTMA.View.update();
    });

    $(document).bind('npcMove', function() {
        OTMA.View.update();
    });
    OTMA.View.update();

    $(document).keydown(function(event) {
        var keyCode = event.which;
        var keyMap = {
            37: 'west',
            38: 'north',
            39: 'east',
            40: 'south'
        };
        if (keyMap[keyCode]) {
            OTMA.GameEngine.movePlayer(keyMap[keyCode]);
        }
    });

    $(document).bind('meetsWinCondition', function() {
        OTMA.util.setCSSVisibilityOnElement('#winInstructionHolder', true);
    });
}