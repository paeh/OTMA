package de.hsa.otma.android.config;

import de.hsa.otma.android.map.Room;
import de.hsa.otma.android.player.Hint;
import de.hsa.otma.android.player.NPCPlayer;

import java.util.List;

/**
 * Specialized interface to read certain contents from config
 */
public interface Config {

    List<Room> getRooms();

    List<NPCPlayer> getNPCPlayers();

    List<Hint> getHints();
}
