package de.hsa.otma.android.player;

import de.hsa.otma.android.map.Coordinate;

public class NPCPlayer extends Player {
    private int picture;


    public NPCPlayer(Coordinate coordinate, int picture, String name) {
        super(coordinate, name);
        this.picture = picture;
    }

    public int getPicture() {
        return picture;
    }
}
