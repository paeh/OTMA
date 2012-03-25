package de.hsa.otma.android.map;

import java.io.Serializable;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class GameMapItem implements Serializable {
    
    private Coordinate coordinate;

    private transient Map<MapDirection, GameMapItem> directions = new HashMap<MapDirection, GameMapItem>();

    /**
     * Redundant storage of available directions. Needed to make directions variable transient to avoid serialisation
     * loops.
     */
    private Set<MapDirection> availableDirections = new HashSet<MapDirection>();

    private int drawableId;

    public GameMapItem(Coordinate coordinate, int drawableId) {
        this.coordinate = coordinate;
        this.drawableId = drawableId;
    }

    public void setBoundaryItems(GameMapItem north, GameMapItem east, GameMapItem south, GameMapItem west) {
        setDirection(MapDirection.NORTH, north);
        setDirection(MapDirection.EAST, east);
        setDirection(MapDirection.SOUTH, south);
        setDirection(MapDirection.WEST, west);

        updateAvailableDirections();
    }

    private void setDirection(MapDirection direction, GameMapItem item) {
        if (item != null)  {
            directions.put(direction, item);
        }
    }

    private void updateAvailableDirections() {
        availableDirections = directions.keySet();
    }

    public GameMapItem getMapItemFor(MapDirection direction) {
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

        GameMapItem that = (GameMapItem) o;

        return !(coordinate != null ? !coordinate.equals(that.coordinate) : that.coordinate != null);

    }

    @Override
    public int hashCode() {
        return coordinate != null ? coordinate.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "GameMapItem{" +
                "coordinate=" + coordinate +
                ", drawableId=" + drawableId +
                '}';
    }
}
