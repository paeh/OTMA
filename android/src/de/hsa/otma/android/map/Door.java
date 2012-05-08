package de.hsa.otma.android.map;

import de.hsa.otma.android.R;

import static de.hsa.otma.android.map.Direction.NORTH;
import static de.hsa.otma.android.map.Direction.SOUTH;

public class Door extends BoardElement
{
    private Room room;

    private BoardElement origin;

    private String title;

    private String abbreviation;

    public Door(Coordinate coordinate, BoardElement origin)
    {
        super(coordinate, R.drawable.door);
        super.setElementForDirection(SOUTH, origin);
        this.origin = origin;
    }

    public Room getRoom()
    {
        return room;
    }

    public void setRoom(Room room)
    {
        this.room = room;
        super.setElementForDirection(NORTH, room);
    }

    public String getAbbreviation()
    {
        return room.getAbbreviation();
    }

    public String getTitle()
    {
        return room.getTitle();
    }

    public BoardElement getOrigin(){
        return origin;
    }

    @Override
    public String toString()
    {
        return "Door{" +
            "abbreviation='" + abbreviation + '\'' +
            ", room=" + room +
            ", origin=" + origin +
            ", title='" + title + '\'' +
            "} " + super.toString();
    }
}
