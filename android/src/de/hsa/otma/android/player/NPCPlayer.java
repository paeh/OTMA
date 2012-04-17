package de.hsa.otma.android.player;

import de.hsa.otma.android.map.Coordinate;

public class NPCPlayer extends Player {
    private int picture;

    private String title;
    
    private String introduction;

    public NPCPlayer(Coordinate coordinate, int picture, String name) {
        super(coordinate, name);
    }

    public int getPicture() {
        return picture;
    }
}
