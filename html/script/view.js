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

        var player = OTMA.Engine.Player;
        var mapItem = OTMA.Board.boardElements[player.coordinate];

        disableButtonIfNavigationIsUndefined(mapItem, 'north', '#north');
        disableButtonIfNavigationIsUndefined(mapItem, 'south', '#south');
        disableButtonIfNavigationIsUndefined(mapItem, 'west', '#west');
        disableButtonIfNavigationIsUndefined(mapItem, 'east', '#east');
    },

    updateNPCView: function() {
        var currentBoardElement = OTMA.Engine.getCurrentBoardElement();
        var npc = OTMA.NPC.getNPCForBoardElement(currentBoardElement);
        if (npc) {
            $('#npcImage').attr('src', 'images/' + npc.picture);
        } else {
            $('#npcImage').attr('src', 'images/blank.png');
        }
    },

    updateMapBackground: function() {
        var player = OTMA.Engine.Player;
        var mapItem = OTMA.Board.boardElements[player.coordinate];

        var picture = 'images/map/' + mapItem.picture;
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
    };

    $(document).bind('npcMove', function() {
        update();
    });
    update();
}