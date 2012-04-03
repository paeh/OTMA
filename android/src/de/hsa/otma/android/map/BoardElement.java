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

    private transient Map<MapDirection, BoardElement> directions = new HashMap<MapDirection, BoardElement>();

    /**
     * Redundant storage of available directions. Needed to make directions variable transient to avoid serialisation
     * loops.
     */
    private Set<MapDirection> availableDirections = new HashSet<MapDirection>();

    private int drawableId;

    public BoardElement(Coordinate coordinate, int drawableId) {
        this.coordinate = coordinate;
        this.drawableId = drawableId;
    }

    public void setBoundaryItems(BoardElement north, BoardElement east, BoardElement south, BoardElement west) {
        setDirection(MapDirection.NORTH, north);
        setDirection(MapDirection.EAST, east);
        setDirection(MapDirection.SOUTH, south);
        setDirection(MapDirection.WEST, west);

        updateAvailableDirections();
    }

    private void setDirection(MapDirection direction, BoardElement item) {
        if (item != null)  {
            directions.put(direction, item);
        }
    }

    private void updateAvailableDirections() {
        availableDirections = directions.keySet();
    }

    public BoardElement getMapItemFor(MapDirection direction) {
        return directions.get(direction);
    }

    public int getDrawableId() {
        return drawableId;
    }

    public Coordinate getCoordinate() {
        return coordinate;
    }

    public Set<MapDirection> getAvailableDirections() {
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
                ", drawableId=" + drawableId +
                '}';
    }

    public NPCPlayer getNpcPlayer() {
        return npcPlayer;
    }

    public void setNpcPlayer(NPCPlayer npcPlayer) {
        this.npcPlayer = npcPlayer;
    }
}
