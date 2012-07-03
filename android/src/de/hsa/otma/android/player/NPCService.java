package de.hsa.otma.android.player;

import de.hsa.otma.android.OTMAApplication;
import de.hsa.otma.android.map.Board;
import de.hsa.otma.android.map.BoardElement;
import de.hsa.otma.android.map.Coordinate;
import de.hsa.otma.android.map.Direction;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Handles NPC movement. NPCs can move to any adjacent tiles. Doors cannot be accessed by NPCs.
 */
public class NPCService {

    public static final NPCService INSTANCE = new NPCService();

    private Board board = Board.INSTANCE;
    private Random random = new Random(System.nanoTime());

    private final List<NPCPlayer> otmaEmployees = OTMAApplication.CONFIG.getNPCPlayers();

    private NPCService() {
    }

    public ArrayList<NPCPlayer> getAllNPCFor(Coordinate coordinate) {
        ArrayList<NPCPlayer> result = new ArrayList<NPCPlayer>();
        for (NPCPlayer npc : otmaEmployees) {
            if (npc.getCoordinate().equals(coordinate)) {
                result.add(npc);
            }
        }
        return result;
    }

    public void moveAllNPC() {
        for (NPCPlayer otmaEmployee : otmaEmployees) {
            move(otmaEmployee);
        }
    }

    /**
     * Moves the NPC to a random adjacent tile.
     */
    private void move(NPCPlayer npc) {
        Coordinate currentCoordinate = npc.getCoordinate();
        BoardElement currentElement = board.getElementFor(currentCoordinate);
        ArrayList<Direction> availableDirections = new ArrayList<Direction>(currentElement.getAvailableDirections());

        BoardElement targetElement;
        do {
            int directionIndex = random.nextInt(availableDirections.size());
            Direction targetDirection = availableDirections.get(directionIndex);
            targetElement = currentElement.getElementFor(targetDirection);
        }
        while (Board.INSTANCE.isAccessibleByNPCPlayer(targetElement.getCoordinate()));

        if (targetElement.getNpcPlayer() == null) {
            targetElement.setNpcPlayer(npc);
            npc.moveTo(targetElement.getCoordinate());
        }
    }
}
