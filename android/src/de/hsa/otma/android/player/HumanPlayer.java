package de.hsa.otma.android.player;

import de.hsa.otma.android.map.Coordinate;
import de.hsa.otma.android.room.Hint;

import java.util.HashSet;
import java.util.Set;

public class HumanPlayer extends Player {

    private Set<Hint> foundHints = new HashSet<Hint>();

    private Set<NPCPlayer> foundNPCs = new HashSet<NPCPlayer>();

    public HumanPlayer(Coordinate coordinate, String name) {
        super(coordinate, name);
    }
}
