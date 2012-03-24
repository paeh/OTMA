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
}
