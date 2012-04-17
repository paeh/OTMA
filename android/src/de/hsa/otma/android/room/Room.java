package de.hsa.otma.android.room;

import de.hsa.otma.android.map.Door;

import java.util.ArrayList;
import java.util.List;

public class Room {

    private Door door;

    private List<Hint> hints = new ArrayList<Hint>();

    private List<String> stories = new ArrayList<String>();

    private String title;

    private String description;
    
    private String abbreviation;

    public Room(String title, String description, String abbreviation) {
        this.title = title;
        this.description = description;
        this.abbreviation = abbreviation;
    }

    public Door getDoor() {
        return door;
    }

    public void setDoor(Door door) {
        this.door = door;
    }
}
