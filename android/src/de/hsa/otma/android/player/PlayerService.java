package de.hsa.otma.android.player;

import android.util.Log;
import de.hsa.otma.android.map.*;

public class PlayerService {
    public static final PlayerService INSTANCE = new PlayerService();

    private Player humanPlayer;
    private static final Board BOARD = Board.INSTANCE;

    private PlayerService() {
        humanPlayer = new Player(new Coordinate(1, 1), "human");
    }

    public BoardElement move(Direction direction) {
        BoardElement currentMapItem = getCurrentMapItem();
        BoardElement newMapItem;

        if(currentMapItem instanceof Door){
            newMapItem = ((Door)currentMapItem).getOrigin();
        }
        else{
            newMapItem = currentMapItem.getElementFor(direction);
        }

        Log.e("TAG", "current position = " + currentMapItem);

        if (newMapItem == null) return null;

        Log.e("TAG", "moving to " + newMapItem);
        humanPlayer.moveTo(newMapItem.getCoordinate());

        return newMapItem;
    }

    public BoardElement getCurrentMapItem() {
        Coordinate currentCoordinate = humanPlayer.getCoordinate();
        return BOARD.getElementFor(currentCoordinate);
    }
}
