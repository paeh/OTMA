OTMA.NPC = {
    people: [],
    availableAvatarImages: ['head.png'],
    avatarImageCounter: 0,
    stepCounter: 0,

    findRandomNonOccupiedBoardElement: function() {
        do {
            var boardItem = OTMA.Board.getRandomBoardElement();
        } while (OTMA.NPC.getNPCForBoardElement(boardItem));
        return boardItem;
    },
    getNPCForBoardElement: function(boardItem) {
        var coordinate = boardItem.coordinate;
        return OTMA.NPC.getNPCForCoordinate(coordinate);
    },
    getNPCForCoordinate: function(coordinate) {
        var ret = undefined;
        $.each(OTMA.NPC.people, function(index, npc) {
            if (npc.coordinate == coordinate) {
                ret = npc;
            }
        });
        return ret;
    },
    moveAllNPCs: function() {
        OTMA.NPC.stepCounter++;
        if (OTMA.NPC.stepCounter % 2 != 0) return;

        $.each(OTMA.NPC.people, function(index, npc) {
            OTMA.NPC.moveNPC(npc);
        });
    },
    moveNPC: function(npc) {
        var currentBoardElement = OTMA.Board.boardElements[npc.coordinate];
        var availableBoardElements = OTMA.Board.getBoardElementsInAvailableDirections(currentBoardElement);
        do {
            var randomNumber = Math.floor(Math.random() * availableBoardElements.length);
            var boardElement = availableBoardElements[randomNumber];

            if (! OTMA.NPC.getNPCForBoardElement(boardElement)) {
                npc.coordinate = boardElement.coordinate;
                return;
            } else {
                availableBoardElements = $.removeIndexFromArray(randomNumber, availableBoardElements);
            }
        } while (availableBoardElements.length > 0)
    },
    getNextAvatarPicture: function() {
        OTMA.NPC.avatarImageCounter++;
        OTMA.NPC.avatarImageCounter %= OTMA.NPC.availableAvatarImages.length;
        return OTMA.NPC.availableAvatarImages[OTMA.NPC.avatarImageCounter];
    }
};

function initialiseNPC() {
    var people = OTMA.xmlContent.people;
    $.each(people, function(index, npc) {
        var boardElement = OTMA.NPC.findRandomNonOccupiedBoardElement();
        npc.coordinate = boardElement.coordinate;
        npc.picture = OTMA.NPC.getNextAvatarPicture();
        OTMA.NPC.people.push(npc);
    });

    $(document).bind('playerMove', function() {
        OTMA.NPC.moveAllNPCs();
        $(document).trigger('npcMove')
    })
}
