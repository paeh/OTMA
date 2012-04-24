/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

/**
 * Class managing all Non-Playing-Characters (NPC).
 * @type {Object}
 */
OTMA.NPCService = {
    people: [],
    availableAvatarImages: ['npc_1.png', 'npc_2.png', 'npc_3.png', 'npc_4.png', 'npc_5.png', 'npc_6.png', 'npc_7.png'],
    avatarImageCounter: -1,
    stepCounter: 0,

    /**
     * Resets all saved attributes within the NPCService.
     */
    reset: function() {
        OTMA.NPCService.stepCounter = 0;
        OTMA.NPCService.avatarImageCounter = -1;
        OTMA.NPCService.people = [];
    },

    /**
     * Find some random board element on which no NPC is already sitting.
     * @return {*} board element without a NPC.
     */
    findRandomNonOccupiedBoardElement: function() {
        do {
            var boardItem = OTMA.Board.getRandomBoardElement();
        } while (OTMA.NPCService.getNPCForBoardElement(boardItem));
        return boardItem;
    },

    /**
     * Tries to find a NPC on a given board element.
     * @param boardElement boardElement to use for looking up a NPC.
     * @return {*} found NPC or undefined
     */
    getNPCForBoardElement: function(boardElement) {
        var coordinate = boardElement.coordinate;
        return OTMA.NPCService.getNPCForCoordinate(coordinate);
    },

    /**
     * Tries to find a NPC on a given coordinate.
     * @param coordinate coordinate to use for looking up a NPC.
     * @return {*} found NPC or undefined
     */
    getNPCForCoordinate: function(coordinate) {
        var ret = undefined;
        $.each(OTMA.NPCService.people, function(index, npc) {
            if (npc.coordinate == coordinate) {
                ret = npc;
            }
        });
        return ret;
    },

    /**
     * Move all NPCs. Usually triggered when the human player moves to the next board element or interacts with a room
     * or door.
     */
    moveAllNPCs: function() {
        OTMA.NPCService.stepCounter++;
        if (OTMA.NPCService.stepCounter % OTMA.Constants.NPC_ROUND_SPEED != 0) return;

        $.each(OTMA.NPCService.people, function(index, npc) {
            OTMA.NPCService.moveNPC(npc);
        });
    },

    /**
     * Move an NPC to a random board element, which is adjacent to the NPC's current board element and is available
     * (no other NPC is already on this board element)
     * @param npc NPC to move
     */
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
    /**
     * Get the next available avatar picture for the availableAvatarImages array. If more avatar images are required
     * than being available, the array pointer for the avatar pictures restarts at the beginning of the array.
     * @return {*} found avatar picture
     */
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
        npc.picture = OTMA.NPCService.getNextAvatarPicture();
        OTMA.NPCService.people.push(npc);
    });

    $(document).bind('playerMove', function() {
        OTMA.NPCService.moveAllNPCs();
        $(document).trigger('npcMove')
    })
}
