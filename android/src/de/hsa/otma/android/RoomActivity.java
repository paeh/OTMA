package de.hsa.otma.android;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import de.hsa.otma.android.config.Config;
import de.hsa.otma.android.map.BoardElement;
import de.hsa.otma.android.map.Direction;
import de.hsa.otma.android.map.Room;
import de.hsa.otma.android.navigation.NavigationOnClickListener;
import de.hsa.otma.android.navigation.NavigationPanel;
import de.hsa.otma.android.player.Hint;
import de.hsa.otma.android.player.PlayerService;

import java.util.List;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;

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
            timer.cancel();
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
        startPresentation();
    }

    public static class RoomHolder {
        public static Room room;
    }

    private void createLayout() {
        setContentView(R.layout.room);

        BoardElement element = new BoardElement(null, 0);
        element.setElementForDirection(Direction.SOUTH, room.getDoor());
        navigationPanel.updateButtonActions(element);

        setRoomHeadline(room.getTitle());
        setRoomDescription(room.getDescription());
    }

    private void setRoomHeadline(String text) {
        setTextOfTextView(R.id.roomHeadline, text);
    }

    private void setRoomDescription(String text) {
        setTextOfTextView(R.id.roomDescription, text);
    }

    private void setTextOfTextView(int textViewId, final String text) {
        final TextView textView = (TextView) findViewById(textViewId);
        textView.post(new Runnable() {
            @Override
            public void run() {
                textView.setText(text);
            }
        });
    }


    private Random random = new Random(System.nanoTime());
    private final Timer timer = new Timer(true);

    private void startPresentation() {
        timer.scheduleAtFixedRate(new PresentationSwitchingTask(), Config.ROOM_CONTENT_TIME, Config.ROOM_CONTENT_TIME);
    }

    private class PresentationSwitchingTask extends TimerTask {

        @Override
        public void run() {

            String text = "";
            if (random.nextInt(Config.CHANCE_TO_GET_HINT_IN_ROOM) == 0) {
                List<Hint> hints = room.getHints();
                if (!hints.isEmpty()) {
                    Hint hint = hints.get(random.nextInt(hints.size()));
                    PlayerService.INSTANCE.foundHint(hint, RoomActivity.this);
                    text = hint.getTitle() + "\n\n" + hint.getText();
                }
            } else {
                List<String> stories = room.getStories();
                if (!stories.isEmpty()) {
                    text = stories.get(random.nextInt(stories.size()));
                }
            }

            setTextOfTextView(R.id.roomPresentation, text);
        }
    }
}
