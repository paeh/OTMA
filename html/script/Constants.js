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
    ROOM_CONTENT_TIME: 1000,

    /**
     * NPCs can move in certain intervals. If set to 2, only every second player interaction with the game
     * will trigger a move action for all NPCs.
     */
    NPC_ROUND_SPEED: 2,

    /**
     * Default state of the whole game engine. Usually this defaults to RECEPTION.
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

    /**
     * You should only change this property if also providing appropriate images
     * for the respective board coordinates!
     * The linking between each board element still has to be hardcoded in OTMA.Board
     */
    MAP_WIDTH: 5,
    MAP_HEIGHT: 5
};