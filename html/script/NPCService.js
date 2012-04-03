OTMA.NPCService = {
    people: [],
    availableAvatarImages: ['npc_1.png', 'npc_2.png', 'npc_3.png', 'npc_4.png', 'npc_5.png', 'npc_6.png', 'npc_7.png'],
    avatarImageCounter: -1,
    stepCounter: 0,

    reset: function() {
        OTMA.NPCService.stepCounter = 0;
        OTMA.NPCService.avatarImageCounter = -1;
    },
    findRandomNonOccupiedBoardElement: function() {
        do {
            var boardItem = OTMA.Board.getRandomBoardElement();
        } while (OTMA.NPCService.getNPCForBoardElement(boardItem));
        return boardItem;
    },
    getNPCForBoardElement: function(boardItem) {
        var coordinate = boardItem.coordinate;
        return OTMA.NPCService.getNPCForCoordinate(coordinate);
    },
    getNPCForCoordinate: function(coordinate) {
        var ret = undefined;
        $.each(OTMA.NPCService.people, function(index, npc) {
            if (npc.coordinate == coordinate) {
                ret = npc;
            }
        });
        return ret;
    },
    moveAllNPCs: function() {
        OTMA.NPCService.stepCounter++;
        if (OTMA.NPCService.stepCounter % OTMA.Constants.NPC_ROUND_SPEED != 0) return;

        $.each(OTMA.NPCService.people, function(index, npc) {
            OTMA.NPCService.moveNPC(npc);
        });
    },
    moveNPC: function(npc) {
        var currentBoardElement = OTMA.Board.boardElements[npc.coordinate];
        var availableBoardElements = OTMA.Board.getBoardElementsInAvailableDirections(currentBoardElement);
        do {
            var randomNumber = OTMA.util.getRandomInteger(availableBoardElements.length);
            var boardElement = availableBoardElements[randomNumber];

            if (! OTMA.NPCService.getNPCForBoardElement(boardElement)) {
                npc.coordinate = boardElement.coordinate;
                return;
            } else {
                availableBoardElements = $.removeIndexFromArray(randomNumber, availableBoardElements);
            }
        } while (availableBoardElements.length > 0)
    },
    getNextAvatarPicture: function() {
        OTMA.NPCService.avatarImageCounter++;
        OTMA.NPCService.avatarImageCounter %= OTMA.NPCService.availableAvatarImages.length;
        return OTMA.NPCService.availableAvatarImages[OTMA.NPCService.avatarImageCounter];
    }
};

function initialiseNPC() {
    var people = OTMA.xmlContent.people;
    $.each(people, function(index, npc) {
        var boardElement = OTMA.NPCService.findRandomNonOccupiedBoardElement();
        npc.coordinate = boardElement.coordinate;
        npc.coordinate = '1x1';
        npc.picture = OTMA.NPCService.getNextAvatarPicture();
        OTMA.NPCService.people.push(npc);
    });

    $(document).bind('playerMove', function() {
        OTMA.NPCService.moveAllNPCs();
        $(document).trigger('npcMove')
    })
}
