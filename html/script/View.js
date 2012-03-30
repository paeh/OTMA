OTMA.View = {
    states: {

        MAP: {
            updateButtons: function() {
                var player = OTMA.PlayerService.Player;
                var mapItem = OTMA.Board.boardElements[player.coordinate];
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
            }
        },

        DOOR: {
            updateButtons: function() {
                var mapItem = { south: 'south', north: 'north' };
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
            updateButtons: function() {
                var mapItem = { south: 'south' };
                OTMA.View.disableButtonsBasedOnDirections(mapItem);
            },
            updateBackground: function(currentMapItem) {
                var door = currentMapItem[OTMA.PlayerService.Player.viewingDoor];

                OTMA.View.setBackground('images/room.png');
                OTMA.View.currentState.showRoomHint();
                OTMA.util.setCSSVisibilityOnElement('#roomHolder', true);

                $('#roomHolder div.roomTitle').html(door.room.title);
            },
            showRoomHint: function() {
                if (OTMA.GameEngine.state != 'ROOM') {
                    return;
                }

                var hint = OTMA.GameEngine.getRandomRoomHint();

                $('#roomHolder div.roomHint div.title').html(hint.title);
                $('#roomHolder div.roomHint div.text').html(hint.text);

                $('#roomHolder div.roomHint').delay(OTMA.Constants.HINT_TIME).queue(function(next) {
                    OTMA.View.states.ROOM.showRoomHint();
                    next();
                });
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
        OTMA.View.currentState.updateButtons();
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
            $(buttonId).attr('src', 'images/black_' + property + '.png');
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
        var currentBoardElement = OTMA.GameEngine.getCurrentBoardElement();
        var npc = OTMA.NPCService.getNPCForBoardElement(currentBoardElement);

        if (! npc) return;

        $('#conversation div.conversationTitle').html(npc.name);
        $('#conversation div.conversationSubTitle').html(npc.title);
        $('#conversation div.conversationText').html(npc.introduction);

        OTMA.util.setCSSVisibilityOnElement('#conversationHolder', true);

        $(document).trigger('npcFound', npc);
    },

    hideNPCConversation: function() {
        OTMA.util.setCSSVisibilityOnElement('#conversationHolder', false);
    }
};


function initialiseView() {

    OTMA.View.currentState = OTMA.View.states[OTMA.Constants.DEFAULT_STATE];

    $(document).bind('stateChange', function(event, newState) {
        OTMA.View.currentState = OTMA.View.states[newState];
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
        if (! OTMA.View.hasShowWinInstruction) {
            OTMA.util.setCSSVisibilityOnElement('#winInstructionHolder', true);
            OTMA.View.hasShowWinInstruction = true;
        }
    })
}