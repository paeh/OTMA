OTMA.View = {
    updateButtons: function() {
        function disableButtonIfNavigationIsUndefined(mapItem, property, buttonId) {
            if (mapItem[property] == undefined) {
                $(buttonId).attr('disabled', true);
                $(buttonId).attr('src', 'images/grey_' + property + '.png');
            } else {
                $(buttonId).attr('disabled', false);
                $(buttonId).attr('src', 'images/black_' + property + '.png');
            }
        }

        function disableButtonsBasedOnDirections(mapItem) {
            disableButtonIfNavigationIsUndefined(mapItem, 'north', '#north');
            disableButtonIfNavigationIsUndefined(mapItem, 'south', '#south');
            disableButtonIfNavigationIsUndefined(mapItem, 'west', '#west');
            disableButtonIfNavigationIsUndefined(mapItem, 'east', '#east');
        }

        var player = OTMA.Engine.Player;
        var mapItem;
        if (OTMA.Engine.Player.viewingRoom) {
            mapItem = { south: 'south' };
        } else if (OTMA.Engine.Player.viewingDoor) {
            mapItem = { south: 'south', north: 'north' };
        } else {
            mapItem = OTMA.Board.boardElements[player.coordinate];
        }
        disableButtonsBasedOnDirections(mapItem);
    },

    updateNPCView: function() {
        var currentBoardElement = OTMA.Engine.getCurrentBoardElement();
        var npc = OTMA.NPC.getNPCForBoardElement(currentBoardElement);
        if (npc && ! OTMA.Engine.Player.viewingDoor && ! OTMA.Engine.Player.viewingRoom) {
            $('#npcImage').attr('src', 'images/avatars/' + npc.picture);
        } else {
            $('#npcImage').attr('src', 'images/blank.png');
        }
    },

    updateMapBackground: function() {
        var player = OTMA.Engine.Player;
        var mapItem = OTMA.Board.boardElements[player.coordinate];

        var setBackground = function(picture) {
            $('#backgroundImage').attr('src', picture);
        };

        var doShowDoorDescription = false;
        var doShowRoomHolder = false;

        if (OTMA.Engine.Player.viewingRoom) {
            setBackground('images/room.png');
            doShowRoomHolder = true;
            OTMA.View.showRoomHint();
        } else if (OTMA.Engine.Player.viewingDoor) {
            doShowDoorDescription = true;
            var abbreviation = mapItem[OTMA.Engine.Player.viewingDoor].room.abbreviation;
            $('#doorDescriptionHolder div.doorDescription').html(abbreviation);
            setBackground('images/door.png');
        } else {
            setBackground('images/map/' + mapItem.picture);
        }

        OTMA.util.setCSSVisibilityOnElement('#doorDescriptionHolder', doShowDoorDescription);
        OTMA.util.setCSSVisibilityOnElement('#roomHolder', doShowRoomHolder);
        if (! doShowRoomHolder) {
            OTMA.util.setCSSVisibilityOnElement('#roomHolder div.roomHint', doShowRoomHolder);
        }
    },

    toggleNPCConversation: function() {
        if ($('#conversation').css('visibility') == 'hidden') {
            OTMA.View.showNPCConversation();
        } else {
            OTMA.View.hideNPCConversation();
        }
    },

    showNPCConversation: function() {
        var currentBoardElement = OTMA.Engine.getCurrentBoardElement();
        var npc = OTMA.NPC.getNPCForBoardElement(currentBoardElement);

        if (! npc) return;

        $('#conversation div.conversationTitle').html(npc.name);
        $('#conversation div.conversationSubTitle').html(npc.title);
        $('#conversation div.conversationText').html(npc.introduction);

        $('#conversation').css({
            visibility: 'visible'
        });
    },

    hideNPCConversation: function() {
        $('#conversation').css({
            visibility: 'hidden'
        });
    },

    showRoomHint: function() {
        if (! OTMA.Engine.Player.viewingRoom) {
            return;
        }

        var hint = OTMA.Engine.getRandomRoomHint();

        $('#roomHolder div.roomHint div.title').html(hint.title);
        $('#roomHolder div.roomHint div.text').html(hint.text);

        OTMA.util.setCSSVisibilityOnElement('#roomHolder div.roomHint', true);


        $('#roomHolder div.roomHint').delay(OTMA.Constants.HINT_TIME).queue(function(next) {
            OTMA.View.showRoomHint();
            next();
        });
    }
};

function initialiseView() {
    var update = function() {
        OTMA.View.updateButtons();
        OTMA.View.updateMapBackground();
        OTMA.View.updateNPCView();
        OTMA.View.hideNPCConversation();
    };

    $(document).bind('npcMove', function() {
        update();
    });
    update();
}