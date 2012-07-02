package de.hsa.otma.android;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Point;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import de.hsa.otma.android.map.Direction;

/**
 * Activity displaying Rooms.
 */
public class RoomActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);    //To change body of overridden methods use File | Settings | File Templates.
        //Intent callingIntent = getIntent();

        createLayout();


    }

    @Override
    protected void onStart() {
        super.onStart();    //To change body of overridden methods use File | Settings | File Templates.
    }

    @Override
    protected void onRestart() {
        super.onRestart();    //To change body of overridden methods use File | Settings | File Templates.
    }

    @Override
    protected void onResume() {
        super.onResume();    //To change body of overridden methods use File | Settings | File Templates.

    }

    @Override
    protected void onPause() {
        super.onPause();    //To change body of overridden methods use File | Settings | File Templates.
    }

    @Override
    protected void onStop() {
        super.onStop();    //To change body of overridden methods use File | Settings | File Templates.
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();    //To change body of overridden methods use File | Settings | File Templates.
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

        //layout.addView(background);

        /**
        setButtonNavigationAction(Direction.WEST, R.id.westButton, mapItem.getAvailableDirections());
        setButtonNavigationAction(Direction.EAST, R.id.eastButton, mapItem.getAvailableDirections());
        setButtonNavigationAction(Direction.SOUTH, R.id.southButton, mapItem.getAvailableDirections());
        setButtonNavigationAction(Direction.NORTH, R.id.northButton, mapItem.getAvailableDirections());

        addNPCButton(otmaEmployees);

        addOtmaEmployees(width, layout, otmaEmployees);
         */
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
}
