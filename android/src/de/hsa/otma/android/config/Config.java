package de.hsa.otma.android.config;

import de.hsa.otma.android.map.Room;
import de.hsa.otma.android.player.Hint;
import de.hsa.otma.android.player.NPCPlayer;

import java.util.List;

/**
 * Specialized interface to read certain contents from config
 */
public interface Config {

    /**
     * Time interval in which the room content is changed. Provided in milli seconds.
     */
    int ROOM_CONTENT_TIME = 1000;

    /**
     * NPCs can move in certain intervals. If set to 2, only every second player interaction
     * with the game will trigger a move action for all NPCs.
     */
    int NPC_ROUND_SPEED = 5;

    /**
     * Chance to get hint in room as 1/n
     */
    int CHANCE_TO_GET_HINT_IN_ROOM = 3;

    /**
     * The player has to find a certain amount of NPCs as win requirement.
     */
    int WIN_NPC_COUNT = 2;

    /**
     * The player has to find a certain amount of hints within rooms as win requirements.
     */
    int WIN_HINT_COUNT = 2;

    List<Room> getRooms();

    List<NPCPlayer> getNPCPlayers();

    List<Hint> getHints();

    List<String> getStories();
}
