/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

/**
 * Class responsible for generating the actual view shown to the user.
 * @class
 */
OTMA.View = function() {

    var that = this;

    /**
     * Available states
     */
    this.states = {
        MAP: {
            /**
             * Update all buttons based on the current map item.
             * @param {OTMA.domain.BoardElement} currentMapItem current map item.
             */
            updateButtons: function(currentMapItem) {
                that.disableButtonsBasedOnDirections(currentMapItem);
            },

            /**
             * Hides or shows NPCs on a given map slice. Hides or shows NPC button used for getting the
             * conversation view for NPCs.
             */
            updateNPCView: function() {
                var currentBoardElement = OTMA.GameEngine.INSTANCE.getCurrentBoardElement();
                var npc = OTMA.NPCService.INSTANCE.getNPCForBoardElement(currentBoardElement);
                if (npc && OTMA.GameEngine.INSTANCE.state == 'MAP') {
                    $('#npcImage').attr('src', 'images/avatars/' + npc.picture);
                    OTMA.util.setCSSVisibilityOnElement('#npcButton', true);
                } else {
                    $('#npcImage').attr('src', 'images/blank.png');
                    OTMA.util.setCSSVisibilityOnElement('#npcButton', false);
                }
            },

            /**
             * Updates the main view background by showing the map slice image associated to the current map item.
             * @param {OTMA.domain.BoardElement} currentMapItem current map item
             */
            updateBackground: function(currentMapItem) {
                that.setBackground('images/map/' + currentMapItem.image);
            },

            /**
             * Shows an NPC conversation dialogue. This is usually triggered whenever the NPCButton has been clicked.
             */
            showNPCConversation: function() {
                var currentBoardElement = OTMA.GameEngine.getCurrentBoardElement();
                var npc = OTMA.NPCService.INSTANCE.getNPCForBoardElement(currentBoardElement);

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
             * @param {OTMA.domain.BoardElement} currentMapItem current map item.
             */
            updateButtons: function(currentMapItem) {
                var door = currentMapItem[OTMA.PlayerService.INSTANCE.Player.viewingDoor];
                var availableDirections = { south: 'south', north: 'north' };

                if (! door.room || (! OTMA.GameEngine.INSTANCE.checkWinConditions() && door.room.type == 'WIN_ROOM')) {
                    availableDirections.north = undefined;
                }
                that.disableButtonsBasedOnDirections(availableDirections);
                OTMA.util.setCSSVisibilityOnElement('#npcButton', false);
            },

            /**
             * Updates the main view background by showing the door image as well as the door description if a
             * room is found behind the door.
             * @param {OTMA.domain.BoardElement} currentMapItem current map item
             */
            updateBackground: function(currentMapItem) {
                that.setBackground('images/door.png');
                var door = currentMapItem[OTMA.PlayerService.INSTANCE.Player.viewingDoor];

                if (! door.room) return;

                var abbreviation = door.room.abbreviation;
                $('#doorDescriptionHolder div.doorDescription').html(abbreviation);
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
             * @param {OTMA.domain.BoardElement} currentMapItem current map item.
             */
            updateButtons: function(currentMapItem) {
                var door = currentMapItem[OTMA.PlayerService.INSTANCE.Player.viewingDoor];
                var room = door.room;

                var mapItem = { south: 'south' };
                if (room.type == 'WIN_ROOM') {
                    mapItem = {};
                }
                that.disableButtonsBasedOnDirections(mapItem);
                OTMA.util.setCSSVisibilityOnElement('#npcButton', false);
            },

            /**
             * Updates the main view background by showing the room image as well as showing room content (hints,
             * stories and room specific description). The method also triggers the automatic changing of room content.
             * @param {OTMA.domain.BoardElement} currentMapItem current map item
             */
            updateBackground: function(currentMapItem) {
                var door = currentMapItem[OTMA.PlayerService.INSTANCE.Player.viewingDoor];

                if (door.room.type == 'WIN_ROOM') {
                    that.setBackground('images/finish.png');
                    OTMA.util.setCSSVisibilityOnElement('#winHolder', true);
                    $('#winHolder div.winText').html(OTMA.Constants.WIN_PAGE_TEXT);
                } else {
                    that.setBackground('images/room.png');
                    that.currentState.showRoomContent(door.room);
                    OTMA.util.setCSSVisibilityOnElement('#roomHolder', true);

                    $('#roomHolder div.roomTitle').html(door.room.title);
                    $('#roomHolder div.roomDescription').html(door.room.description);
                }
            },

            /**
             * Dynamically changes the room content.
             * @param {OTMA.domain.Room} room
             */
            showRoomContent: function(room) {
                if (OTMA.GameEngine.INSTANCE.state != 'ROOM') {
                    return;
                }

                var content = room.getRandomContent();

                $('#roomHolder div.roomContent div.title').html(content.title);
                $('#roomHolder div.roomContent div.text').html(content.text);

                $('#roomHolder div.roomContent').delay(OTMA.Constants.ROOM_CONTENT_TIME).queue(function(next) {
                    that.states.ROOM.showRoomContent(room);
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
                that.disableButtonsBasedOnDirections({});
            },

            /**
             * Show the reception background image.
             */
            updateBackground: function() {
                $('#receptionHolder div.hintInfo').html(OTMA.Constants.RECEPTION_TEXT);
                that.setBackground('images/reception.png');
                OTMA.util.setCSSVisibilityOnElement('#receptionHolder', true);
            },

            /**
             * Empty implementation for NPC viewing. A NPC can never walk to the reception.
             */
            updateNPCView: function() {
                $('#npcImage').attr('src', 'images/blank.png');
            }
        }
    };

    /**
     * Current view state.
     */
    this.currentState = {};

    /**
     * Updates the global view, including buttons etc.
     * Method decides which state (room, map, door) to show based on OTMA.View.currentState attribute.
     */
    this.update = function() {
        var player = OTMA.PlayerService.INSTANCE.Player;
        var mapItem = OTMA.Board.INSTANCE.boardElements[player.coordinate];

        $.each($('div.holder'), function(index, element) {
            OTMA.util.setCSSVisibilityOnElement('#' + element.id, false);
        });

        that.currentState.updateNPCView();
        that.currentState.updateButtons(mapItem);
        that.currentState.updateBackground(mapItem);

        if (that.currentState.update) {
            that.currentState.update();
        }
    };

    /**
     * Disables a button based on a given selector attribute if an attribute on the mapItem is undefined.
     * @param {Object} directions mapItem used for checking
     * @param {String} propertyToCheck property on the mapItem to check.
     * @param {String} buttonSelector selector used for finding the button in the UI
     */
    this.disableButtonIfNavigationIsUndefined = function(directions, propertyToCheck, buttonSelector) {
        if (directions[propertyToCheck] == undefined) {
            $(buttonSelector).attr('disabled', true);
            $(buttonSelector).attr('src', 'images/grey_' + propertyToCheck + '.png');
        } else {
            $(buttonSelector).attr('disabled', false);
            $(buttonSelector).attr('src', 'images/white_' + propertyToCheck + '.png');
        }
    };

    /**
     * Updates all direction buttons based on direction attributes on a map item.
     * @param {Object} directions directions used for map checking.
     */
    this.disableButtonsBasedOnDirections = function(directions) {
        that.disableButtonIfNavigationIsUndefined(directions, 'north', '#north');
        that.disableButtonIfNavigationIsUndefined(directions, 'south', '#south');
        that.disableButtonIfNavigationIsUndefined(directions, 'west', '#west');
        that.disableButtonIfNavigationIsUndefined(directions, 'east', '#east');
    };

    /**
     * Update all buttons based on the current View state.
     */
    this.updateButtons = function() {
        that.currentState.updateButtons();
    };

    /**
     * Set the main content background image.
     * @param {String} picture image URL to set
     */
    this.setBackground = function(picture) {
        $('#backgroundImage').attr('src', picture);
    };

    /**
     * Toggles the NPC conversation dialogue.
     */
    this.toggleNPCConversation = function() {
        if ($('#conversation').css('visibility') == 'hidden') {
            that.showNPCConversation();
        } else {
            that.hideNPCConversation();
        }
    };

    /**
     * Shows the NPC conversation dialogue.
     */
    this.showNPCConversation = function() {
        if (that.currentState.showNPCConversation) {
            that.currentState.showNPCConversation();
        }
    };

    /**
     * Hides the NPC conversation dialogue.
     */
    this.hideNPCConversation = function() {
        OTMA.util.setCSSVisibilityOnElement('#conversationHolder', false);
    };
};
OTMA.View.INSTANCE = new OTMA.View();


function initialiseView() {

    var view = OTMA.View.INSTANCE;
    view.currentState = view.states[OTMA.Constants.DEFAULT_STATE];

    $(document).bind('stateChange', function(event, newState) {
        view.currentState = view.states[newState];
        view.update();
    });

    $(document).bind('npcMove', function() {
        view.update();
    });
    view.update();

    $(document).keydown(function(event) {
        var keyCode = event.which;
        var keyMap = {
            37: 'west',
            38: 'north',
            39: 'east',
            40: 'south'
        };
        if (keyMap[keyCode]) {
            OTMA.GameEngine.INSTANCE.movePlayer(keyMap[keyCode]);
        }
    });

    $(document).bind('meetsWinCondition', function() {
        $('#winInstructionHolder div.winInstruction').html(OTMA.Constants.WIN_MEETS_REQUIREMENTS_TEXT);
        OTMA.util.setCSSVisibilityOnElement('#winInstructionHolder', true);
    });
}
