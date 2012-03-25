package de.hsa.otma.android.map;

import java.util.HashMap;
import java.util.Map;

public class GameMapItem {
    
    private Coordinate coordinate;

    private Map<MapDirection, GameMapItem> directions = new HashMap<MapDirection, GameMapItem>();

    private int drawable;

    public GameMapItem(Coordinate coordinate, int drawable) {
        this.coordinate = coordinate;
        this.drawable = drawable;
    }

    public void setBoundaryItems(GameMapItem north, GameMapItem east, GameMapItem south, GameMapItem west) {
        directions.put(MapDirection.NORTH, north);
        directions.put(MapDirection.EAST, east);
        directions.put(MapDirection.SOUTH, south);
        directions.put(MapDirection.WEST, west);
    }

    public GameMapItem getMapItemFor(MapDirection direction) {
        return directions.get(direction);
    }

    public int getDrawable() {
        return drawable;
    }

    public Coordinate getCoordinate() {
        return coordinate;
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
                ", drawable=" + drawable +
                '}';
    }
}
