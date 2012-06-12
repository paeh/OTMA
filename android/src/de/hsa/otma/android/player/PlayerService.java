package de.hsa.otma.android.player;

import android.util.Log;
import de.hsa.otma.android.map.*;

public class PlayerService {
    private static final String TAG = PlayerService.class.getSimpleName();
    public static final PlayerService INSTANCE = new PlayerService();

    private HumanPlayer humanPlayer;
    private static final Board BOARD = Board.INSTANCE;

    private PlayerService() {
        humanPlayer = new HumanPlayer(new Coordinate(1, 1), "human");
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

        Log.e(TAG, "current position = " + currentMapItem);

        if (newMapItem == null) return null;

        Log.e(TAG, "moving to " + newMapItem);
        humanPlayer.moveTo(newMapItem.getCoordinate());

        return newMapItem;
    }

    public void foundHint(Hint hint) {
        humanPlayer.found(hint);
        Log.i(TAG, "found hint '" + hint.getTitle()  +"'");
    }

    public void foundNPC(NPCPlayer player) {
        humanPlayer.found(player);
        Log.i(TAG, "found npc '" + player.getName() +"'");
    }

    public boolean hasChallengeCompleted() {

        // TODO code to predict challenge completion
        return false;
    }

    public BoardElement getCurrentMapItem() {
        Coordinate currentCoordinate = humanPlayer.getCoordinate();
        return BOARD.getElementFor(currentCoordinate);
    }
}
