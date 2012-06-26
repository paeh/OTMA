package de.hsa.otma.android.map;

import de.hsa.otma.android.player.NPCPlayer;

import java.io.Serializable;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * BoardElement with coordinate, (possibly) npcPlayer and accessible directions (adjacent BoardElements/Doors).
 */
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

    protected BoardElement(int picture) {
        this(null, picture);
    }

    public void setBoundaryElements(BoardElement north, BoardElement east, BoardElement south, BoardElement west) {
        setElementForDirection(Direction.NORTH, north);
        setElementForDirection(Direction.EAST, east);
        setElementForDirection(Direction.SOUTH, south);
        setElementForDirection(Direction.WEST, west);

        updateAvailableDirections();
    }

    public void setElementForDirection(Direction direction, BoardElement item) {
        if (item != null)  {
            directions.put(direction, item);
            updateAvailableDirections();
        } else {
            directions.remove(direction);
            updateAvailableDirections();
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
