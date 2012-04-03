package de.hsa.otma.android.player;

import de.hsa.otma.android.map.Coordinate;

public class NPCPlayer extends Player {
    private int picture;

    private String introduction;

    public NPCPlayer(Coordinate coordinate, int picture, String name, String introduction) {
        super(coordinate, name);
        this.picture = picture;
        this.introduction = introduction;
    }

    public int getPicture() {
        return picture;
    }
}
