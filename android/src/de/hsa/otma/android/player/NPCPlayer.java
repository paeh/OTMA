package de.hsa.otma.android.player;

import de.hsa.otma.android.map.Coordinate;

public class NPCPlayer extends Player {
    private int picture;

    private String title;

    public String getIntroduction() {
        return introduction;
    }

    private String introduction;

    public NPCPlayer(Coordinate coordinate, int picture, String name, String title, String introduction) {
        super(coordinate, name);
        this.picture = picture;
        this.title = title;
        this.introduction = introduction;
    }

    public int getPicture() {
        return picture;
    }

    @Override
    public String toString(){
        return super.toString()+" title: "+title+" introduction: "+introduction;
    }
}
