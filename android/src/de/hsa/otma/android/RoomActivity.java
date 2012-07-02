package de.hsa.otma.android;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import de.hsa.otma.android.map.BoardElement;
import de.hsa.otma.android.map.Direction;
import de.hsa.otma.android.map.Room;
import de.hsa.otma.android.navigation.NavigationOnClickListener;
import de.hsa.otma.android.navigation.NavigationPanel;

/**
 * Activity displaying Rooms.
 */
public class RoomActivity extends Activity {

    private static final String TAG = RoomActivity.class.getName();

    private NavigationPanel navigationPanel = new NavigationPanel(this, new BackToDoorListener());

    private Room room = null;

    private class BackToDoorListener implements NavigationOnClickListener {

        @Override
        public void clickedOn(Direction direction) {
            Log.d(TAG, "leaving room");
            finish();
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Workaround for magic java.io.NotSerializableException: java.util.HashMap$KeySet
        // BoardElement.directions is tried to serialize but is transient ?!
//        Intent callingIntent = getIntent();
//        room = (Room) callingIntent.getExtras().get(BundleKeys.ROOM);
        room = RoomHolder.room;

        createLayout();
    }

    public static class RoomHolder {
        public static Room room;
    }

    private void createLayout() {
        setContentView(R.layout.room);

        BoardElement element = new BoardElement(null, 0);
        element.setElementForDirection(Direction.SOUTH, room.getDoor());
        navigationPanel.updateButtonActions(element);

        navigationPanel.disableNPCButton();

        setRoomHeadline(room.getDescription());
    }

    private void setRoomHeadline(String text){
        TextView textView = (TextView) findViewById(R.id.roomHeadline);
        textView.setText(text);
    }
}
