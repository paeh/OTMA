/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

OTMA.Constants = {
    /**
     * Time interval in which the room content is changed. Provided in milli seconds.
     */
    ROOM_CONTENT_TIME: 10000,

    /**
     * NPCs can move in certain intervals. If set to 2, only every second player interaction with the game
     * will trigger a move action for all NPCs.
     */
    NPC_ROUND_SPEED: 2,

    /**
     * Default state of the whole game engine. Usually this defaults to RECEPTION. Available states
     * are ['RECEPTION', 'MAP', 'DOOR', 'ROOM']. However, DOOR and ROOM should never be assigned here, as those
     * need more date in various variables.
     */
    DEFAULT_STATE: 'RECEPTION',

    /**
     * The player has to find a certain amount of NPCs as win requirement.
     */
    WIN_NPC_COUNT: 2,

    /**
     * The player has to find a certain amount of hints within rooms as win requirements.
     */
    WIN_HINT_COUNT: 2,

    /**
     * Static content used for mixing in content within the rooms, so that players not only find hints but have to
     * wait some time to find them.
     */
    STORY_ITEMS: [
        new OTMA.domain.Story('Bla1', 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum '),
        new OTMA.domain.Story('Bla2', 'Bla2'),
        new OTMA.domain.Story('Bla3', 'Bla3')
    ],

    RECEPTION_TEXT: 'Note: All hints available in the game will be given to you on win.',
    WIN_MEETS_REQUIREMENTS_TEXT: 'You have found all required hints and NPCs. Now go and find the exit door!',
    WIN_CAPTION: 'YOU WIN!',
    WIN_PAGE_TEXT: 'Congratulations! Click <a href="http://www.onthemove-academy.org/" target="_blank">here</a> to find out more about OTMA and to see all the game hints.',

    /**
     * You should only change this property if also providing appropriate images
     * for the respective board coordinates!
     * The linking between each board element still has to be hardcoded in OTMA.Board
     */
    MAP_WIDTH: 5,
    MAP_HEIGHT: 5,

    /**
     * Images for the NPC players. Only change this array if also changing the available avatar images in
     * images/avatars!
     */
    AVAILABLE_NPC_IMAGES: ['npc_1.png', 'npc_2.png', 'npc_3.png', 'npc_4.png', 'npc_5.png', 'npc_6.png', 'npc_7.png']
};
