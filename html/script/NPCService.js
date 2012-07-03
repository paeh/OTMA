/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

/**
 * Class managing all Non-Playing-Characters (NPC). This includes moving them from one board element to another and
 * initialising them to some free board element.
 * @class
 */
OTMA.NPCService = function() {

    /**
     * Available NPC People.
     * @type {Array}
     */
    this.people = [];

    /**
     * Available avatar images.
     * @private
     */
    this.availableAvatarImages = OTMA.Constants.AVAILABLE_NPC_IMAGES;

    /**
     * @private
     * @type {Number}
     */
    this.avatarImageCounter = -1;

    var stepCounter = 0;

    var that = this;

    /**
     * Resets all saved attributes within the NPCService.
     */
    this.reset = function() {
        that.stepCounter = 0;
        that.avatarImageCounter = -1;
        that.people = [];
    };

    /**
     * Find some random board element on which no NPC is already sitting.
     * @return {OTMA.domain.BoardElement} board element without a NPC.
     */
    this.findRandomNonOccupiedBoardElement = function() {
        var boardItem;
        do {
            boardItem = OTMA.Board.INSTANCE.getRandomBoardElement();
        } while (that.getNPCForBoardElement(boardItem));
        return boardItem;
    };

    /**
     * Tries to find a NPC on a given board element.
     * @param {OTMA.domain.BoardElement} boardElement boardElement to use for looking up a NPC.
     * @return {OTMA.domain.NPCPlayer} found NPC or undefined
     */
    this.getNPCForBoardElement = function(boardElement) {
        var coordinate = boardElement.coordinate;
        return that.getNPCForCoordinate(coordinate);
    };

    /**
     * Tries to find a NPC on a given coordinate.
     * @param {String} coordinate coordinate to use for looking up a NPC.
     * @return {OTMA.domain.NPCPlayer} found NPC or undefined
     */
    this.getNPCForCoordinate = function(coordinate) {
        var ret = undefined;
        $.each(that.people, function(index, npc) {
            if (npc.coordinate == coordinate) {
                ret = npc;
            }
        });
        return ret;
    };

    /**
     * Move all NPCs. Usually triggered when the human player moves to the next board element or interacts with a room
     * or door.
     */
    this.moveAllNPCs = function() {
        stepCounter++;
        if (stepCounter % OTMA.Constants.NPC_ROUND_SPEED != 0) return;

        $.each(that.people, function(index, npc) {
            that.moveNPC(npc);
        });
    };

    /**
     * Move an NPC to a random board element, which is adjacent to the NPC's current board element and is available
     * (no other NPC is already on this board element)
     * @param {OTMA.domain.NPCPlayer} npc NPC to move
     */
    this.moveNPC = function(npc) {
        var currentBoardElement = OTMA.Board.INSTANCE.boardElements[npc.coordinate];
        var availableBoardElements = currentBoardElement.getAvailableNavigationDirections();
        do {
            var randomNumber = OTMA.util.getRandomInteger(availableBoardElements.length);
            var boardElement = availableBoardElements[randomNumber];

            if (! that.getNPCForBoardElement(boardElement)) {
                npc.coordinate = boardElement.coordinate;
                return;
            } else {
                availableBoardElements = $.removeIndexFromArray(randomNumber, availableBoardElements);
            }
        } while (availableBoardElements.length > 0)
    };
    /**
     * Get the next available avatar picture for the availableAvatarImages array. If more avatar images are required
     * than being available, the array pointer for the avatar pictures restarts at the beginning of the array.
     * @return {String} found avatar picture
     */
    this.getNextAvatarPicture = function() {
        that.avatarImageCounter++;
        that.avatarImageCounter %= that.availableAvatarImages.length;
        return that.availableAvatarImages[that.avatarImageCounter];
    };
};
OTMA.NPCService.INSTANCE = new OTMA.NPCService();

function initialiseNPC() {
    var npcService = OTMA.NPCService.INSTANCE;
    var people = OTMA.XML.INSTANCE.lastLoad.people;
    $.each(people, function(index, npc) {
        var boardElement = npcService.findRandomNonOccupiedBoardElement();
        npc.coordinate = boardElement.coordinate;
        npc.picture = npcService.getNextAvatarPicture();
        npcService.people.push(npc);
    });

    $(document).bind('playerMove', function() {
        OTMA.NPCService.INSTANCE.moveAllNPCs();
        $(document).trigger('npcMove')
    })
}
