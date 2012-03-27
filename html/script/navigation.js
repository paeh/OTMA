function loadNavigationFunctions() {
    OTMA.Navigation = {
        movePlayerTo: function(directionProperty) {
            var currentCoordinate = OTMA.Engine.player.coordinate;
            var currentMapItem = OTMA.Board.boardElements[currentCoordinate];

            if (! currentMapItem[directionProperty]) return;

            OTMA.Engine.player.coordinate = currentMapItem[directionProperty].coordinate;
            OTMA.View.updateButtons();
            OTMA.View.updateMapBackground();

            $(document).trigger('playerMove');
        }
    };

    $(document).keydown(function(event) {
       var keyCode = event.which;
        if (keyCode == 37) {
            OTMA.Navigation.movePlayerTo("west")
        } else if (keyCode == 38) {
            OTMA.Navigation.movePlayerTo("north")
        } else if (keyCode == 39) {
            OTMA.Navigation.movePlayerTo("east")
        } else if (keyCode == 40) {
            OTMA.Navigation.movePlayerTo("south")
        }
    });
}