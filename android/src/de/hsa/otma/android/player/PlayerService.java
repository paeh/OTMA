package de.hsa.otma.android.player;

import android.app.Activity;
import android.util.Log;
import android.view.View;
import android.widget.Toast;
import de.hsa.otma.android.R;
import de.hsa.otma.android.config.Config;
import de.hsa.otma.android.map.*;

/**
 * Class handling player movement as well as win conditions.
 */
public class PlayerService {
    private static final String TAG = PlayerService.class.getName();
    public static final PlayerService INSTANCE = new PlayerService();

    private HumanPlayer humanPlayer;
    private static final Board BOARD = Board.INSTANCE;

    private PlayerService() {
        humanPlayer = new HumanPlayer(new Coordinate(1, 1), "human");
//        humanPlayer = new HumanPlayer(BOARD.getRandomCoordinateOnBoard(), "human");
    }

    public BoardElement move(Direction direction) {
        BoardElement currentMapItem = getCurrentMapItem();
        BoardElement newMapItem;

        if (currentMapItem instanceof Door) {
            newMapItem = ((Door) currentMapItem).getOrigin();
        } else {
            newMapItem = currentMapItem.getElementFor(direction);
        }

        Log.d(TAG, "current position = " + currentMapItem);

        if (newMapItem == null) return null;

        Log.i(TAG, "moving to " + newMapItem);
        humanPlayer.moveTo(newMapItem.getCoordinate());

        return newMapItem;
    }

    public void foundHint(Hint hint, Activity contextToShowToast) {
        humanPlayer.found(hint);
        Log.i(TAG, "found hint '" + hint.getTitle() + "'");
        notifyUserIfChallengeIsCompleted(contextToShowToast);
    }

    public void foundNPC(NPCPlayer player, Activity contextToShowToast) {
        humanPlayer.found(player);
        Log.i(TAG, "found npc '" + player.getName() + "'");
        notifyUserIfChallengeIsCompleted(contextToShowToast);
    }

    public boolean hasChallengeCompleted() {
        int foundHints = humanPlayer.numberOfFoundHints();
        int foundNPCs = humanPlayer.numberOfFoundNPCs();

        return foundHints >= Config.WIN_HINT_COUNT && foundNPCs >= Config.WIN_NPC_COUNT;
    }

    private void notifyUserIfChallengeIsCompleted(final Activity contextToShowToast) {
        if (hasChallengeCompleted()) {
            View view = contextToShowToast.findViewById(R.id.northButton);
            view.post(new Runnable() {
                @Override
                public void run() {
                    Toast.makeText(contextToShowToast, contextToShowToast.getString(R.string.WIN_MEETS_REQUIREMENTS_TEXT), Toast.LENGTH_LONG).show();
                }
            });
        }
    }

    public BoardElement getCurrentMapItem() {
        Coordinate currentCoordinate = humanPlayer.getCoordinate();
        return BOARD.getElementFor(currentCoordinate);
    }
}
