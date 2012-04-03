package de.hsa.otma.android.map;

import de.hsa.otma.android.player.NPCPlayer;

import java.io.Serializable;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class BoardElement implements Serializable {
    
    private Coordinate coordinate;

    private NPCPlayer npcPlayer;

    private transient Map<Direction, BoardElement> directions = new HashMap<Direction, BoardElement>();

    /**
     * Redundant storage of available directions. Needed to make directions variable transient to avoid serialisation
     * loops.
     */
    private Set<Direction> availableDirections = new HashSet<Direction>();

    private int picture;

    public BoardElement(Coordinate coordinate, int picture) {
        this.coordinate = coordinate;
        this.picture = picture;
    }

    public void setBoundaryElements(BoardElement north, BoardElement east, BoardElement south, BoardElement west) {
        setDirection(Direction.NORTH, north);
        setDirection(Direction.EAST, east);
        setDirection(Direction.SOUTH, south);
        setDirection(Direction.WEST, west);

        updateAvailableDirections();
    }

    private void setDirection(Direction direction, BoardElement item) {
        if (item != null)  {
            directions.put(direction, item);
        }
    }

    private void updateAvailableDirections() {
        availableDirections = directions.keySet();
    }

    public BoardElement getElementFor(Direction direction) {
        return directions.get(direction);
    }

    public int getPicture() {
        return picture;
    }

    public Coordinate getCoordinate() {
        return coordinate;
    }

    public Set<Direction> getAvailableDirections() {
        return availableDirections;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BoardElement that = (BoardElement) o;

        return !(coordinate != null ? !coordinate.equals(that.coordinate) : that.coordinate != null);

    }

    @Override
    public int hashCode() {
        return coordinate != null ? coordinate.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "BoardElement{" +
                "coordinate=" + coordinate +
                ", picture=" + picture +
                '}';
    }

    public NPCPlayer getNpcPlayer() {
        return npcPlayer;
    }

    public void setNpcPlayer(NPCPlayer npcPlayer) {
        this.npcPlayer = npcPlayer;
    }
}
