package de.hsa.otma.android.player;

import de.hsa.otma.android.R;
import de.hsa.otma.android.map.Coordinate;
import de.hsa.otma.android.map.Board;
import de.hsa.otma.android.map.BoardElement;
import de.hsa.otma.android.map.Direction;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class NPCService {

    public static final NPCService INSTANCE = new NPCService();
    
    private Board board = Board.INSTANCE;
    private Random random = new Random(System.nanoTime());
    
    private List<NPCPlayer> otmaEmployees = new ArrayList<NPCPlayer>();

    private NPCService() {
        otmaEmployees.add(new NPCPlayer(new Coordinate(1, 1), R.drawable.head, "1"));
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

    private void move(NPCPlayer npc) {
        Coordinate currentCoordinate = npc.getCoordinate();
        BoardElement currentMapItem = board.getElementFor(currentCoordinate);
        ArrayList<Direction> availableDirections = new ArrayList<Direction>(currentMapItem.getAvailableDirections());

        int directionIndex = random.nextInt(availableDirections.size());
        Direction targetDirection = availableDirections.get(directionIndex);
        BoardElement targetMapItem = currentMapItem.getElementFor(targetDirection);

        if (targetMapItem.getNpcPlayer() == null) {
            targetMapItem.setNpcPlayer(npc);
            npc.moveTo(targetMapItem.getCoordinate());
        }
    }
}
