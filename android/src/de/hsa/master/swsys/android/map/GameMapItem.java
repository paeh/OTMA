package de.hsa.master.swsys.android.map;

public class GameMapItem {
    
    private Coordinate coordinate;
    
    private GameMapItem north;
    private GameMapItem south;
    private GameMapItem west;
    private GameMapItem east;
    
    private int drawable;

    public GameMapItem(Coordinate coordinate, int drawable) {
        this.coordinate = coordinate;
        this.drawable = drawable;
    }

    public void setBoundaryItems(GameMapItem north, GameMapItem east, GameMapItem south, GameMapItem west) {
        this.north = north;
        this.east = east;
        this.south = south;
        this.west = west;
    }

    public GameMapItem getNorth() {
        return north;
    }

    public void setNorth(GameMapItem north) {
        this.north = north;
    }

    public GameMapItem getSouth() {
        return south;
    }

    public void setSouth(GameMapItem south) {
        this.south = south;
    }

    public GameMapItem getWest() {
        return west;
    }

    public void setWest(GameMapItem west) {
        this.west = west;
    }

    public GameMapItem getEast() {
        return east;
    }

    public void setEast(GameMapItem east) {
        this.east = east;
    }

    public int getDrawable() {
        return drawable;
    }

    public void setDrawable(int drawable) {
        this.drawable = drawable;
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
