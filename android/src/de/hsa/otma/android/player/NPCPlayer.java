package de.hsa.otma.android.player;

import de.hsa.otma.android.map.Coordinate;

public class NPCPlayer extends Player {
    private int drawableId;


    public NPCPlayer(Coordinate coordinate, int drawableId, String name) {
        super(coordinate, name);
        this.drawableId = drawableId;
    }

    public int getDrawableId() {
        return drawableId;
    }
}
