package de.hsa.otma.android.player;

import de.hsa.otma.android.map.Coordinate;

import java.io.Serializable;

public class Player implements Serializable {
    private Coordinate coordinate;

    private String name;

    public Player(Coordinate coordinate, String name) {
        this.coordinate = coordinate;
        this.name = name;
    }

    public Coordinate getCoordinate() {
        return coordinate;
    }

    public void moveTo(Coordinate coordinate) {
        this.coordinate = coordinate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}