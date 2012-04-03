package de.hsa.otma.android.engine;

import android.app.IntentService;
import android.content.Intent;
import android.os.Bundle;
import android.os.ResultReceiver;
import de.hsa.otma.android.constants.Actions;
import de.hsa.otma.android.constants.BundleKeys;
import de.hsa.otma.android.constants.ResultCodes;
import de.hsa.otma.android.map.BoardElement;
import de.hsa.otma.android.map.MapDirection;
import de.hsa.otma.android.player.NPCService;
import de.hsa.otma.android.player.PlayerService;

public class EngineIntentService extends IntentService {
    public EngineIntentService() {
        super(EngineIntentService.class.getName());
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        if (intent.getAction().equals(Actions.MOVE_TO_DIRECTION)) {
            movePlayerInDirection(intent);
        } else if (intent.getAction().equals(Actions.CURRENT_MAP_ITEM)) {
            getCurrentMapItem(intent);
        }
    }

    private void movePlayerInDirection(Intent intent) {
        MapDirection direction = MapDirection.valueOf(intent.getStringExtra(BundleKeys.DIRECTION));
        ResultReceiver receiver = (ResultReceiver) intent.getParcelableExtra(BundleKeys.RECEIVER);

        BoardElement newMapItem = PlayerService.INSTANCE.move(direction);
        NPCService.INSTANCE.moveAllNPC();

        assembleAndSendResult(receiver, newMapItem);
    }

    private void getCurrentMapItem(Intent intent) {
        ResultReceiver receiver = (ResultReceiver) intent.getParcelableExtra(BundleKeys.RECEIVER);
        BoardElement mapItem = PlayerService.INSTANCE.getCurrentMapItem();

        assembleAndSendResult(receiver, mapItem);
    }

    private void assembleAndSendResult(ResultReceiver receiver, BoardElement mapItem) {
        Bundle resultBundle = new Bundle();
        resultBundle.putSerializable(BundleKeys.MAP_ITEM, mapItem);

        if (mapItem != null) {
            resultBundle.putSerializable(BundleKeys.OTMA_EMPLOYEES, NPCService.INSTANCE.getAllNPCFor(mapItem.getCoordinate()));
        }

        receiver.send(ResultCodes.RESULT_OK,  resultBundle);
    }
}
