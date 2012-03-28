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
            $('#npcImage').attr('src', 'images/' + npc.picture);
        } else {
            $('#npcImage').attr('src', 'images/blank.png');
        }
    },

    updateMapBackground: function() {
        var player = OTMA.Engine.Player;
        var mapItem = OTMA.Board.boardElements[player.coordinate];

        var showDoorDescription = function(doShow) {
            var attr = 'hidden';
            if (doShow) attr = 'visible';
            $('#doorDescriptionHolder').css({
                visibility: attr
            });
        };

        var setBackground = function(picture) {
            $('#backgroundImage').attr('src', picture);
        };

        var doShowDoorDescription = false;
        if (OTMA.Engine.Player.viewingRoom) {
            setBackground('images/room.png');
        } else if (OTMA.Engine.Player.viewingDoor) {
            doShowDoorDescription = true;
            setBackground('images/door.png');
        } else {
            setBackground('images/map/' + mapItem.picture);
        }

        showDoorDescription(doShowDoorDescription);
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