package de.hsa.otma.android.map;

import de.hsa.otma.android.room.Room;

public class Door extends BoardElement {

    private Room room;

    private BoardElement origin;
    
    private String title;

    private String abbreviation;

    public Door(BoardElement origin, int picture) {
        super(origin.getCoordinate(), picture);
        this.origin = origin;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
