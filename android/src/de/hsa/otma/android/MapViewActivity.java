package de.hsa.otma.android;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
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
import android.widget.Toast;
import de.hsa.otma.android.constants.BundleKeys;
import de.hsa.otma.android.map.BoardElement;
import de.hsa.otma.android.map.Door;
import de.hsa.otma.android.navigation.NavigationListener;
import de.hsa.otma.android.navigation.NavigationPanel;
import de.hsa.otma.android.player.NPCPlayer;
import de.hsa.otma.android.player.PlayerService;
import de.hsa.otma.android.view.DoorLabel;

import java.util.ArrayList;
import java.util.List;

/**
 * Activity displaying game board and providing functionality for directional buttons, npcButton...
 * Furthermore it provides closeup view of doors which are only more specific board-elements.
 */
public class MapViewActivity extends Activity {

    private static final String TAG = MapViewActivity.class.getName();
    private NavigationPanel navigationPanel = new NavigationPanel(this, new MapNavigationListener());

    private class MapNavigationListener implements NavigationListener {
        @Override
        public void navigatedTo(BoardElement position, List<NPCPlayer> availableNPCs) {
            Log.i(TAG, "navigate to " + position);
            if (position == null) {
                Toast.makeText(MapViewActivity.this, R.string.goto_mapitem_error, Toast.LENGTH_SHORT).show();
            } else {
                createLayout(position, availableNPCs);
            }
        }
    }


    private class NPCOnClickListener implements View.OnClickListener {
        private final Context context;
        private final NPCPlayer npc;

        NPCOnClickListener(Context context, NPCPlayer npc) {
            this.context = context;
            this.npc = npc;
        }

        @Override
        public void onClick(View view) {
            Log.d(TAG, "NPCButton has been clicked");
            AlertDialog.Builder builder = new AlertDialog.Builder(context);
            builder.setMessage(npc.getIntroduction());
            builder.setTitle("Hello!!");
            builder.setNeutralButton("OK", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialogInterface, int i) {
                    Log.d(TAG, "NPCDialog closing.");
                    dialogInterface.cancel();
                    PlayerService.INSTANCE.foundNPC(npc, MapViewActivity.this);
                }
            });
            AlertDialog alert = builder.create();
            alert.show();

        }
    }


    @Override
    @SuppressWarnings("unchecked")
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent callingIntent = getIntent();

        BoardElement mapItem = (BoardElement) callingIntent.getSerializableExtra(BundleKeys.MAP_ITEM);
        List<NPCPlayer> otmaEmployees = (List<NPCPlayer>) callingIntent.getSerializableExtra(BundleKeys.OTMA_EMPLOYEES);

        if (mapItem == null) {
            mapItem = PlayerService.INSTANCE.getCurrentMapItem();
        }
        if (otmaEmployees == null) {
            otmaEmployees = new ArrayList<NPCPlayer>();
        }

        createLayout(mapItem, otmaEmployees);
    }

    private void createLayout(BoardElement mapItem, List<NPCPlayer> otmaEmployees) {
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

        Log.d(TAG, "creating layout for " + mapItem.toString());
        Drawable drawable = getResources().getDrawable(mapItem.getPicture());
        background.setImageDrawable(drawable);
        background.setScaleType(ImageView.ScaleType.FIT_XY);

        layout.addView(background);

        navigationPanel.updateButtonActions(mapItem);

        if (mapItem instanceof Door) {
            Door door = (Door) mapItem;
            if (door.hasRoomBehind()) {
                showDoorLabel(door, layout);
            }
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

    private void addNPCButton(List<NPCPlayer> otmaEmployees) {
        if (otmaEmployees != null && otmaEmployees.size() > 0) {
            Button button = (Button) findViewById(R.id.npcButton);
            button.setVisibility(Button.VISIBLE);
            button.setOnClickListener(new NPCOnClickListener(this, otmaEmployees.get(0)));
        }
    }

    private void addOtmaEmployees(int width, RelativeLayout layout, List<NPCPlayer> otmaEmployees) {
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
