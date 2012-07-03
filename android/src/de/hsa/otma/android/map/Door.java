package de.hsa.otma.android.map;

import de.hsa.otma.android.R;

import static de.hsa.otma.android.map.Direction.SOUTH;

/**
 * Door with origin BoardElement, title, abbreviation and possibly attached Room.
 * Door can be set as win door (which allows the player to complete the game)
 */
public class Door extends BoardElement {
    private boolean isWinDoor = false;

    private Room room;

    private BoardElement origin;

    private String title;

    private String abbreviation;

    public Door(Coordinate coordinate, BoardElement origin) {
        super(coordinate, R.drawable.door);
        super.setElementForDirection(SOUTH, origin);
        this.origin = origin;
    }

    public boolean hasRoomBehind() {
        return room != null;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public String getAbbreviation() {
        return room.getAbbreviation();
    }

    public String getTitle() {
        return room.getTitle();
    }

    public BoardElement getOrigin() {
        return origin;
    }

    public boolean isWinDoor() {
        return isWinDoor;
    }

    public void setWinDoor(boolean winDoor) {
        isWinDoor = winDoor;
    }

    @Override
    public String toString() {
        return "Door{" +
                "abbreviation='" + abbreviation + '\'' +
                ", room=" + room +
                ", origin=" + origin +
                ", title='" + title + '\'' +
                "} " + super.toString();
    }
}
