package de.hsa.otma.android;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Point;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.widget.*;
import de.hsa.otma.android.constants.Actions;
import de.hsa.otma.android.constants.BundleKeys;
import de.hsa.otma.android.map.BoardElement;
import de.hsa.otma.android.map.Direction;
import de.hsa.otma.android.map.Door;
import de.hsa.otma.android.player.NPCPlayer;
import de.hsa.otma.android.player.PlayerService;
import de.hsa.otma.android.view.DoorLabel;

import java.util.ArrayList;
import java.util.Set;

/**
 * Activity displaying game board and providing functionality for directional buttons, npcButton...
 * Furthermore it provides closeup view of doors.
 */
public class MapViewActivity extends Activity {

    private MapItemResultReceiver mapItemResultReceiver = new MapItemResultReceiver();
    
    private class NavigationOnClickListener implements View.OnClickListener {

        private Direction direction;

        private NavigationOnClickListener(Direction direction) {
            this.direction = direction;
        }

        @Override
        public void onClick(View view) {
            Intent intent = new Intent(Actions.MOVE_TO_DIRECTION);
            intent.putExtra(BundleKeys.DIRECTION, direction.toString());
            intent.putExtra(BundleKeys.RECEIVER, mapItemResultReceiver);
            startService(intent);
        }
    }

    private class NPCOnClickListener implements View.OnClickListener{
        private final Context context;
        private final NPCPlayer npc;

        NPCOnClickListener(Context context, NPCPlayer npc){
            this.context = context;
            this.npc = npc;
        }

        @Override
        public void onClick(View view){
            Log.i(MapViewActivity.class.getName(), "NPCButton has been clicked");
            AlertDialog.Builder builder = new AlertDialog.Builder(context);
            builder.setMessage(npc.getIntroduction());
            builder.setTitle("Hello!!");
            builder.setNeutralButton("OK", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialogInterface, int i) {
                            Log.i(MapViewActivity.class.getName(), "NPCDialog closing.");
                            dialogInterface.cancel();
                        }
                    });
            AlertDialog alert = builder.create();
            alert.show();

            PlayerService.INSTANCE.foundNPC(npc);
        }
    }
    
    private class MapItemResultReceiver extends ResultReceiver {

        public MapItemResultReceiver() {
            super(new Handler());
        }

        @Override
        @SuppressWarnings("unchecked")
        protected void onReceiveResult(int resultCode, Bundle resultData) {
            if (resultData.get(BundleKeys.MAP_ITEM) == null) {
                Toast.makeText(MapViewActivity.this, R.string.goto_mapitem_error, Toast.LENGTH_SHORT).show();
            } else {
                BoardElement mapItem = (BoardElement) resultData.getSerializable(BundleKeys.MAP_ITEM);
                ArrayList<NPCPlayer> otmaEmployees = (ArrayList<NPCPlayer>) resultData.getSerializable(BundleKeys.OTMA_EMPLOYEES);

                createLayout(mapItem, otmaEmployees);
            }
        }
    }

    @Override
    @SuppressWarnings("unchecked")
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        Intent callingIntent = getIntent();

        BoardElement mapItem = (BoardElement) callingIntent.getSerializableExtra(BundleKeys.MAP_ITEM);
        ArrayList<NPCPlayer> otmaEmployees = (ArrayList<NPCPlayer>) callingIntent.getSerializableExtra(BundleKeys.OTMA_EMPLOYEES);

        if (mapItem == null) {
            Intent initialIntent = new Intent(Actions.CURRENT_MAP_ITEM);
            initialIntent.putExtra(BundleKeys.RECEIVER, mapItemResultReceiver);
            startService(initialIntent);
            return;
        }

        createLayout(mapItem, otmaEmployees);
    }

    private void createLayout(BoardElement mapItem, ArrayList<NPCPlayer> otmaEmployees) {
        setContentView(R.layout.main);

        Display display = getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        int width = size.x;
        int height = size.y;

        RelativeLayout layout = (RelativeLayout) findViewById(R.id.layout);
        layout.removeAllViews();
        layout.getLayoutParams().height = height - 200;

        ImageView background = new ImageView(this);

        Log.e(MapViewActivity.class.getName(), mapItem.toString());
        Drawable drawable = getResources().getDrawable(mapItem.getPicture());
        background.setImageDrawable(drawable);
        background.setScaleType(ImageView.ScaleType.FIT_XY);

        layout.addView(background);

        setButtonNavigationAction(Direction.WEST, R.id.westButton, mapItem.getAvailableDirections());
        setButtonNavigationAction(Direction.EAST, R.id.eastButton, mapItem.getAvailableDirections());
        setButtonNavigationAction(Direction.SOUTH, R.id.southButton, mapItem.getAvailableDirections());


        if (mapItem instanceof Door && ((Door)mapItem).hasRoomBehind()) {
            Door door = (Door) mapItem;
            showDoorLabel(door, layout);
            setButtonToEnterRoom(R.id.northButton);
        }
        else{
            setButtonNavigationAction(Direction.NORTH, R.id.northButton, mapItem.getAvailableDirections());
        }

        addNPCButton(otmaEmployees);

        addOtmaEmployees(width, layout, otmaEmployees);
    }

    /**
     * We have to do this whole view creation because we reuse the view for every map item.
     */
    private void showDoorLabel(Door door, RelativeLayout layout) {
        DoorLabel label = new DoorLabel(door, layout);
        layout.addView(label);
    }

    private void addNPCButton(ArrayList<NPCPlayer> otmaEmployees){
        Button button = (Button) findViewById(R.id.npcButton);
        if(otmaEmployees == null || otmaEmployees.size() == 0){
            button.setVisibility(Button.INVISIBLE);
            return;
        }
        button.setOnClickListener(new NPCOnClickListener(this, otmaEmployees.get(0)));
    }

    private void setButtonToEnterRoom(int buttonId){
        ImageView imageButton = (ImageView) findViewById(buttonId);
        imageButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent mapViewIntent = new Intent(MapViewActivity.this, RoomActivity.class);
                startActivity(mapViewIntent);
            }
        });
    }

    private void setButtonNavigationAction(Direction direction, int buttonId, Set<Direction> availableDirections) {
        ImageView imageButton = (ImageView) findViewById(buttonId);

        if (! availableDirections.contains(direction)) {
            if(buttonId == R.id.northButton){
                imageButton.setImageResource(R.drawable.grey_up);
            }
            else if(buttonId == R.id.eastButton){
                imageButton.setImageResource(R.drawable.grey_right);
            }
            else if(buttonId == R.id.southButton){
                imageButton.setImageResource(R.drawable.grey_down);
            }
            else{
                imageButton.setImageResource(R.drawable.grey_left);
            }
        } else {
            imageButton.setOnClickListener(new NavigationOnClickListener(direction));
        }
    }


    private void addOtmaEmployees(int width, RelativeLayout layout, ArrayList<NPCPlayer> otmaEmployees) {
        int offsetX = 0;
        int offsetY = 0;
        for (NPCPlayer otmaEmployee : otmaEmployees) {
            Drawable drawable = getResources().getDrawable(otmaEmployee.getPicture());

            ImageView employeeImageView = getHead(width, drawable, offsetX, offsetY);
            layout.addView(employeeImageView);

            offsetX -= 30;
            offsetY += 30;
        }
    }

    private ImageView getHead(int width, Drawable headDrawable, int additionalMarginLeft, int additionalMarginTop) {
        ImageView head = new ImageView(this);
        head.setImageDrawable(headDrawable);
        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(50, 50);
        params.leftMargin = width - 50 - 50 + additionalMarginLeft;
        params.topMargin = 20 + additionalMarginTop;
        head.setLayoutParams(params);
        return head;
    }
}
