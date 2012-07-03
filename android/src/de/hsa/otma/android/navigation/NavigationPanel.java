package de.hsa.otma.android.navigation;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import de.hsa.otma.android.R;
import de.hsa.otma.android.RoomActivity;
import de.hsa.otma.android.constants.Actions;
import de.hsa.otma.android.constants.BundleKeys;
import de.hsa.otma.android.map.BoardElement;
import de.hsa.otma.android.map.Direction;
import de.hsa.otma.android.map.Door;
import de.hsa.otma.android.map.Room;
import de.hsa.otma.android.player.NPCPlayer;

import java.util.List;
import java.util.Set;

public class NavigationPanel {

    private static final String TAG = NavigationPanel.class.getName();

    private final MapItemResultReceiver mapItemResultReceiver = new MapItemResultReceiver();

    private final Activity activity;
    private final NavigationListener listener;

    private final NavigationOnClickListener clickListener;

    public NavigationPanel(Activity activity, NavigationListener listener) {
        this(activity, listener, null);
    }

    public NavigationPanel(Activity activity, NavigationOnClickListener clickListener) {
        this(activity, null, clickListener);
    }

    public NavigationPanel(Activity activity, NavigationListener listener, NavigationOnClickListener clickListener) {
        this.activity = activity;
        this.listener = listener;
        this.clickListener = clickListener;
    }

    private void setButtonToEnterRoom(int buttonId, final Room room) {
        ImageView imageButton = (ImageView) activity.findViewById(buttonId);
        imageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent mapViewIntent = new Intent(activity, RoomActivity.class);

                // Workaround : see RoomActivity.onCreate()
//                mapViewIntent.putExtra(BundleKeys.ROOM, room);
                RoomActivity.RoomHolder.room = room;

                activity.startActivity(mapViewIntent);
            }
        });
    }

    public void updateButtonActions(BoardElement mapItem) {
        Log.d(TAG, "updating button actions for " + mapItem);
        setButtonNavigationAction(Direction.WEST, R.id.westButton, mapItem.getAvailableDirections());
        setButtonNavigationAction(Direction.EAST, R.id.eastButton, mapItem.getAvailableDirections());
        setButtonNavigationAction(Direction.SOUTH, R.id.southButton, mapItem.getAvailableDirections());

        if (isDoorWithRoomBehind(mapItem)) {
            Room room = ((Door) mapItem).getRoom();
            setButtonToEnterRoom(R.id.northButton, room);
        } else {
            setButtonNavigationAction(Direction.NORTH, R.id.northButton, mapItem.getAvailableDirections());
        }
    }

    private boolean isDoorWithRoomBehind(BoardElement mapItem) {
        return mapItem instanceof Door && ((Door) mapItem).hasRoomBehind();
    }

    private void setButtonNavigationAction(Direction direction, int buttonId, Set<Direction> availableDirections) {
        ImageView imageButton = (ImageView) activity.findViewById(buttonId);

        if (!availableDirections.contains(direction)) {
            if (buttonId == R.id.northButton) {
                imageButton.setImageResource(R.drawable.grey_up);
            } else if (buttonId == R.id.eastButton) {
                imageButton.setImageResource(R.drawable.grey_right);
            } else if (buttonId == R.id.southButton) {
                imageButton.setImageResource(R.drawable.grey_down);
            } else {
                imageButton.setImageResource(R.drawable.grey_left);
            }
        } else {
            imageButton.setOnClickListener(new DelegatingNavigationOnClickListener(direction));
        }
    }

    private class DelegatingNavigationOnClickListener implements View.OnClickListener {

        private Direction direction;

        private DelegatingNavigationOnClickListener(Direction direction) {
            this.direction = direction;
        }

        @Override
        public void onClick(View view) {
            Log.d(TAG, "navigation clicked to " + direction);

            if (clickListener != null) {
                clickListener.clickedOn(direction);
            } else {
                Intent intent = new Intent(Actions.MOVE_TO_DIRECTION);
                intent.putExtra(BundleKeys.DIRECTION, direction.toString());
                intent.putExtra(BundleKeys.RECEIVER, mapItemResultReceiver);
                activity.startService(intent);
            }
        }
    }

    private class MapItemResultReceiver extends ResultReceiver {

        public MapItemResultReceiver() {
            super(new Handler());
        }

        @Override
        @SuppressWarnings("unchecked")
        protected void onReceiveResult(int resultCode, Bundle resultData) {
            Log.d(TAG, "dispatching result of engine to listener");
            BoardElement mapItem = (BoardElement) resultData.getSerializable(BundleKeys.MAP_ITEM);
            List<NPCPlayer> otmaEmployees = (List<NPCPlayer>) resultData.getSerializable(BundleKeys.OTMA_EMPLOYEES);

            listener.navigatedTo(mapItem, otmaEmployees);
        }
    }
}
