function loadNavigationFunctions() {
    OTMA.Navigation = {
        movePlayerTo: function(directionProperty) {
            var currentCoordinate = OTMA.Engine.player.coordinate;
            var currentMapItem = OTMA.Board.boardElements[currentCoordinate];

            if (! currentMapItem[directionProperty]) return;

            OTMA.Engine.player.coordinate = currentMapItem[directionProperty].coordinate;
            OTMA.View.updateButtons();
            OTMA.View.updateMapBackground();
        }
    }
}