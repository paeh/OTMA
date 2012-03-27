function initialiseView() {

    OTMA.View = {
        updateButtons: function() {
            function disableButtonIfNavigationIsUndefined(mapItem, property, buttonId) {
                if (mapItem[property] == undefined) {
                    $(buttonId).attr('disabled', true);
                    $(buttonId).attr('src', 'images/white_' + property + '.png');
                } else {
                    $(buttonId).attr('disabled', false);
                    $(buttonId).attr('src', 'images/black_' + property + '.png');
                }
            }

            var player = OTMA.Engine.player;
            var mapItem = OTMA.Board.boardElements[player.coordinate];

            disableButtonIfNavigationIsUndefined(mapItem, 'north', '#north');
            disableButtonIfNavigationIsUndefined(mapItem, 'south', '#south');
            disableButtonIfNavigationIsUndefined(mapItem, 'west', '#west');
            disableButtonIfNavigationIsUndefined(mapItem, 'east', '#east');
        },

        updateMapBackground: function() {
            var player = OTMA.Engine.player;
            var mapItem = OTMA.Board.boardElements[player.coordinate];

            var picture = 'images/map/' + mapItem.picture;
            $('#backgroundImage').attr('src', picture);
            $('#npcImage').attr('src', 'images/head.png');
        }
    };

    var update = function() {
        OTMA.View.updateButtons();
        OTMA.View.updateMapBackground();
    };

    $(document).bind('npcMove', function() {
       update();
    });

    $(document).bind('playerMove', function() {
        update();
    });
    update();
}