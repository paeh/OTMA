/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

OTMA.View = {
    states: {
        MAP: {
            /**
             * Update all buttons based on the current map item.
             * @param currentMapItem current map item.
             */
            updateButtons: function(currentMapItem) {
                OTMA.View.disableButtonsBasedOnDirections(currentMapItem);
            },

            /**
             * Hides or shows NPCs on a given map slice. Hides or shows NPC button used for getting the
             * conversation view for NPCs.
             */
            updateNPCView: function() {
                var currentBoardElement = OTMA.GameEngine.getCurrentBoardElement();
                var npc = OTMA.NPCService.getNPCForBoardElement(currentBoardElement);
                if (npc && OTMA.GameEngine.state == 'MAP') {
                    $('#npcImage').attr('src', 'images/avatars/' + npc.picture);
                    OTMA.util.setCSSVisibilityOnElement('#npcButton', true);
                } else {
                    $('#npcImage').attr('src', 'images/blank.png');
                    OTMA.util.setCSSVisibilityOnElement('#npcButton', false);
                }
            },

            /**
             * Updates the main view background by showing the map slice image associated to the current map item.
             * @param currentMapItem current map item
             */
            updateBackground: function(currentMapItem) {
                OTMA.View.setBackground('images/map/' + currentMapItem.image);
            },

            /**
             * Shows an NPC conversation dialogue. This is usually triggered whenever the NPCButton has been clicked.
             */
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
            /**
             * Update all buttons based on the current map item.
             * @param currentMapItem current map item.
             */
            updateButtons: function(currentMapItem) {
                var door = currentMapItem[OTMA.PlayerService.Player.viewingDoor];
                var mapItem = { south: 'south', north: 'north' };
                if (! OTMA.GameEngine.checkWinConditions() && door.room.type == 'WIN_ROOM') {
                    mapItem.north = undefined;
                }
                OTMA.View.disableButtonsBasedOnDirections(mapItem);
            },

            /**
             * Updates the main view background by showing the door image as well as the door description if a
             * room is found behind the door.
             * @param currentMapItem current map item
             */
            updateBackground: function(currentMapItem) {
                var abbreviation = currentMapItem[OTMA.PlayerService.Player.viewingDoor].room.abbreviation;
                $('#doorDescriptionHolder div.doorDescription').html(abbreviation);
                OTMA.View.setBackground('images/door.png');
                OTMA.util.setCSSVisibilityOnElement('#doorDescriptionHolder', true);
            },

            /**
             * Empty implementation for NPC viewing. A NPC can never walk to a door.
             */
            updateNPCView: function() {
                $('#npcImage').attr('src', 'images/blank.png');
            }
        },

        ROOM: {
            /**
             * Update all buttons based on the current map item. Within a room, a player can only walk forward and
             * backward.
             * @param currentMapItem current map item.
             */
            updateButtons: function(currentMapItem) {
                var door = currentMapItem[OTMA.PlayerService.Player.viewingDoor];
                var room = door.room;

                var mapItem = { south: 'south' };
                if (room.type == 'WIN_ROOM') {
                    mapItem = {};
                }
                OTMA.View.disableButtonsBasedOnDirections(mapItem);
            },

            /**
             * Updates the main view background by showing the room image as well as showing room content (hints,
             * stories and room specific description). The method also triggers the automatic changing of room content.
             * @param currentMapItem current map item
             */
            updateBackground: function(currentMapItem) {
                var door = currentMapItem[OTMA.PlayerService.Player.viewingDoor];

                if (door.room.type == 'WIN_ROOM') {
                    OTMA.View.setBackground('images/champion.png');
                } else {
                    OTMA.View.setBackground('images/room.png');
                    OTMA.View.currentState.showRoomContent(door.room);
                    OTMA.util.setCSSVisibilityOnElement('#roomHolder', true);

                    $('#roomHolder div.roomTitle').html(door.room.title);
                    $('#roomHolder div.roomDescription').html(door.room.description);
                }
            },

            /**
             * Dynamically changes the room content.
             * @param room
             */
            showRoomContent: function(room) {
                if (OTMA.GameEngine.state != 'ROOM') {
                    return;
                }

                var content = room.getRandomContent();

                $('#roomHolder div.roomContent div.title').html(content.title);
                $('#roomHolder div.roomContent div.text').html(content.text);

                $('#roomHolder div.roomContent').delay(OTMA.Constants.ROOM_CONTENT_TIME).queue(function(next) {
                    OTMA.View.states.ROOM.showRoomContent(room);
                    next();
                });
            },

            /**
             * Empty implementation for NPC viewing. A NPC can never walk into a room.
             */
            updateNPCView: function() {
                $('#npcImage').attr('src', 'images/blank.png');
            }
        },
        RECEPTION: {
            /**
             * Update all buttons based on the current map item. Within a reception, a player can walk nowhere.
             * Hence, all buttons are disabled.
             */
            updateButtons: function() {
                // disable all buttons!
                OTMA.View.disableButtonsBasedOnDirections({});
            },

            /**
             * Show the reception background image.
             */
            updateBackground: function() {
                OTMA.View.setBackground('images/reception.png');
                OTMA.util.setCSSVisibilityOnElement('#receptionHolder', true);
            },

            /**
             * Empty implementation for NPC viewing. A NPC can never walk to the reception.
             */
            updateNPCView: function() {
                $('#npcImage').attr('src', 'images/blank.png');
            }
        }
    },
    currentState: {},

    /**
     * Updates the global view, including buttons etc.
     * Method decides which state (room, map, door) to show based on OTMA.View.currentState attribute.
     */
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

    /**
     * Disables a button based on a given selector attribute if an attribute on the mapItem is undefined.
     * @param mapItem mapItem used for checking
     * @param propertyToCheck property on the mapItem to check.
     * @param buttonSelector selector used for finding the button in the UI
     */
    disableButtonIfNavigationIsUndefined: function(mapItem, propertyToCheck, buttonSelector) {
        if (mapItem[propertyToCheck] == undefined) {
            $(buttonSelector).attr('disabled', true);
            $(buttonSelector).attr('src', 'images/grey_' + propertyToCheck + '.png');
        } else {
            $(buttonSelector).attr('disabled', false);
            $(buttonSelector).attr('src', 'images/white_' + propertyToCheck + '.png');
        }
    },

    /**
     * Updates all direction buttons based on direction attributes on a map item.
     * @param mapItem mapItem used for map checking.
     */
    disableButtonsBasedOnDirections: function(mapItem) {
        OTMA.View.disableButtonIfNavigationIsUndefined(mapItem, 'north', '#north');
        OTMA.View.disableButtonIfNavigationIsUndefined(mapItem, 'south', '#south');
        OTMA.View.disableButtonIfNavigationIsUndefined(mapItem, 'west', '#west');
        OTMA.View.disableButtonIfNavigationIsUndefined(mapItem, 'east', '#east');
    },

    /**
     * Update all buttons based on the current View state.
     */
    updateButtons: function() {
        OTMA.View.currentState.updateButtons();
    },

    /**
     * Set the main content background image.
     * @param picture image URL to set
     */
    setBackground: function(picture) {
        $('#backgroundImage').attr('src', picture);
    },

    /**
     * Toggles the NPC conversation dialogue.
     */
    toggleNPCConversation: function() {
        if ($('#conversation').css('visibility') == 'hidden') {
            OTMA.View.showNPCConversation();
        } else {
            OTMA.View.hideNPCConversation();
        }
    },

    /**
     * Shows the NPC conversation dialogue.
     */
    showNPCConversation: function() {
        if (OTMA.View.currentState.showNPCConversation) {
            OTMA.View.currentState.showNPCConversation();
        }
    },

    /**
     * Hides the NPC conversation dialogue.
     */
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