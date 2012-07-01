package de.hsa.otma.android.navigation;

import de.hsa.otma.android.map.BoardElement;
import de.hsa.otma.android.player.NPCPlayer;

import java.util.List;

public interface NavigationListener {

    void navigatedTo(BoardElement position, List<NPCPlayer> availableNPCs);
}
