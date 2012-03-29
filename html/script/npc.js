OTMA.NPC = {
    people: [],
    availableAvatarImages: ['npc_1.png', 'npc_2.png', 'npc_3.png', 'npc_4.png', 'npc_5.png', 'npc_6.png', 'npc_7.png'],
    avatarImageCounter: -1,
    stepCounter: 0,

    reset: function() {
        OTMA.NPC.stepCounter = 0;
        OTMA.NPC.avatarImageCounter = -1;
    },
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
            var randomNumber = OTMA.util.getRandomInteger(availableBoardElements.length);
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
        npc.coordinate =  '1x1';
        npc.picture = OTMA.NPC.getNextAvatarPicture();
        OTMA.NPC.people.push(npc);
    });

    $(document).bind('playerMove', function() {
        OTMA.NPC.moveAllNPCs();
        $(document).trigger('npcMove')
    })
}
