package de.hsa.otma.android;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Point;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.Toast;
import de.hsa.otma.android.constants.Actions;
import de.hsa.otma.android.constants.BundleKeys;
import de.hsa.otma.android.map.BoardElement;
import de.hsa.otma.android.map.Direction;
import de.hsa.otma.android.player.NPCPlayer;

import java.util.ArrayList;
import java.util.Set;

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
        layout.getLayoutParams().height = height - 150;

        ImageView background = new ImageView(this);

        Log.e(MapViewActivity.class.getName(), mapItem.toString());
        Drawable drawable = getResources().getDrawable(mapItem.getPicture());
        background.setImageDrawable(drawable);
        background.setScaleType(ImageView.ScaleType.FIT_XY);

        layout.addView(background);

        setButtonNavigationAction(Direction.WEST, R.id.westButton, mapItem.getAvailableDirections());
        setButtonNavigationAction(Direction.EAST, R.id.eastButton, mapItem.getAvailableDirections());
        setButtonNavigationAction(Direction.SOUTH, R.id.southButton, mapItem.getAvailableDirections());
        setButtonNavigationAction(Direction.NORTH, R.id.northButton, mapItem.getAvailableDirections());

        addOtmaEmployees(width, layout, otmaEmployees);
    }

    private void setButtonNavigationAction(Direction direction, int buttonId, Set<Direction> availableDirections) {
        Button button = (Button) findViewById(buttonId);

        if (! availableDirections.contains(direction)) {
            button.setEnabled(false);
        } else {
            button.setOnClickListener(new NavigationOnClickListener(direction));
        }
    }


    private void addOtmaEmployees(int width, RelativeLayout layout, ArrayList<NPCPlayer> otmaEmployees) {
        int offsetX = 0;
        int offsetY = 0;
        for (NPCPlayer otmaEmployee : otmaEmployees) {
            Drawable drawable = getResources().getDrawable(otmaEmployee.getDrawableId());

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
