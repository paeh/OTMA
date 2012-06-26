package de.hsa.otma.android.player;

import de.hsa.otma.android.map.Coordinate;

import java.util.HashSet;
import java.util.Set;

/**
 * HumanPlayer with information about found hints and npcs.
 */
public class HumanPlayer extends Player {

    private Set<Hint> foundHints = new HashSet<Hint>();

    private Set<NPCPlayer> foundNPCs = new HashSet<NPCPlayer>();

    public HumanPlayer(Coordinate coordinate, String name) {
        super(coordinate, name);
    }

    public void found(Hint hint) {
        foundHints.add(hint);
    }

    public void found(NPCPlayer player) {
        foundNPCs.add(player);
    }

    public int numberOfFoundNPCs() {
        return foundNPCs.size();
    }

    public int numberOfFoundHints() {
        return foundHints.size();
    }
}
