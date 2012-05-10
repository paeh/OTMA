package de.hsa.otma.android.map;

import de.hsa.otma.android.R;
import de.hsa.otma.android.player.Hint;

import java.util.ArrayList;
import java.util.List;

public class Room extends BoardElement {

    private Door door;

    private List<Hint> hints = new ArrayList<Hint>();

    private List<String> stories = new ArrayList<String>();

    private String title;

    private String description;

    private String abbreviation;

    public Room(String title, String description, String abbreviation) {
        super(R.drawable.room);
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

    public String getTitle()
    {
        return title;
    }

    public String getDescription()
    {
        return description;
    }

    public String getAbbreviation()
    {
        return abbreviation;
    }
}