package de.hsa.otma.android;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Point;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.Display;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import de.hsa.otma.android.constants.BundleKeys;
import de.hsa.otma.android.map.Room;
import de.hsa.otma.android.player.Hint;

import java.util.List;

/**
 * Activity displaying Rooms.
 */
public class RoomActivity extends Activity {

    /**TODO
     * hints und stories anzeigen und dynamisch wechseln
     */
    private List<Hint> hints;
    private List<String> stories;
    private String roomText;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent callingIntent = getIntent();

        Room room = (Room) callingIntent.getSerializableExtra(BundleKeys.ROOM);
        if(room == null){
            this.roomText = "";
        }
        else{
            roomText = room.getDescription();
            hints = room.getHints();
            stories = room.getStories();
        }

        createLayout();
    }

    private void createLayout(){
        setContentView(R.layout.room);

        Display display = getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        int width = size.x;
        int height = size.y;

        //RelativeLayout layout = (RelativeLayout) findViewById(R.id.roomLayout);
        //layout.removeAllViews();
        //layout.getLayoutParams().height = height - 150;

        ImageView background = new ImageView(this);


        Drawable drawable = getResources().getDrawable(R.drawable.room);
        background.setImageDrawable(drawable);
        background.setScaleType(ImageView.ScaleType.FIT_XY);

        disableDirectionalButtons();
        disableNPCButton();
        prepareExitButton();
        setRoomText(roomText);
    }

    private void disableDirectionalButtons() {
        ImageView imageButton = (ImageView) findViewById(R.id.northButton);
        imageButton.setImageResource(R.drawable.grey_up);

        imageButton = (ImageView) findViewById(R.id.eastButton);
        imageButton.setImageResource(R.drawable.grey_right);

        imageButton = (ImageView) findViewById(R.id.southButton);
        imageButton.setImageResource(R.drawable.grey_down);

        imageButton = (ImageView) findViewById(R.id.westButton);
        imageButton.setImageResource(R.drawable.grey_left);
    }

    private void disableNPCButton(){
        Button button = (Button) findViewById(R.id.npcButton);
        button.setVisibility(View.INVISIBLE);
    }

    private void prepareExitButton(){
        Button button = (Button) findViewById(R.id.exitButton);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });
    }

    private void setRoomText(String text){
        TextView textView = (TextView) findViewById(R.id.roomText);
        textView.setText(text);
    }
}
