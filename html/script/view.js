function initialiseView() {

    OTMA.View = {
        updateButtons: function() {
            function disableButtonIfNavigationIsUndefined(mapItem, property, buttonId) {
                if (mapItem[property] == undefined) {
                    $(buttonId).attr('disabled', true);
                } else {
                    $(buttonId).attr('disabled', false);
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

    OTMA.View.updateButtons();
    OTMA.View.updateMapBackground();
}