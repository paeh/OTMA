OTMA.Navigation = {
    movePlayerTo: function(directionProperty) {
        var currentCoordinate = OTMA.Engine.Player.coordinate;
        var currentMapItem = OTMA.Board.boardElements[currentCoordinate];

        if (! currentMapItem[directionProperty]) return;

        OTMA.Engine.Player.coordinate = currentMapItem[directionProperty].coordinate;

        $(document).trigger('playerMove');
    }
};

function loadNavigationFunctions() {
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