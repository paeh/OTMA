package de.hsa.otma.android.config;

import de.hsa.otma.android.player.NPCPlayer;
import de.hsa.otma.android.room.Hint;
import de.hsa.otma.android.room.Room;

import java.util.List;

public interface Config {

    List<Room> getRooms();

    List<NPCPlayer> getNPCPlayers();

    List<Hint> getHints();
}
