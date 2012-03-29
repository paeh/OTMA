OTMA.Navigation = {
    movePlayerTo: function(directionProperty) {
        var currentCoordinate = OTMA.Engine.Player.coordinate;
        var viewingDoor = OTMA.Engine.Player.viewingDoor;
        var viewingRoom = OTMA.Engine.Player.viewingRoom;

        var currentMapItem = OTMA.Board.boardElements[currentCoordinate];
        if (viewingRoom) {
            OTMA.Engine.Player.viewingRoom = false;
            viewingRoom = false;
        }
        if (viewingDoor && ! viewingRoom) {
            if (directionProperty == 'north') {
                OTMA.Engine.Player.viewingRoom = true;
            } else {
                OTMA.Engine.Player.viewingDoor = undefined;
            }
        }

        if (! viewingDoor && ! viewingRoom) {
            var directionMapItem = currentMapItem[directionProperty];
            if (! directionMapItem) return;

            OTMA.Engine.Player.coordinate = directionMapItem.coordinate;

            if (directionMapItem.type == 'DOOR') {
                OTMA.Engine.Player.viewingDoor = directionProperty;
            }
        }

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