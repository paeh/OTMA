package de.hsa.master.swsys;

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
import android.widget.Toast;
import de.hsa.master.swsys.android.map.Coordinate;
import de.hsa.master.swsys.android.map.GameMap;
import de.hsa.master.swsys.android.map.GameMapItem;
import de.hsa.master.swsys.constants.BundleKeys;

public class MapViewActivity extends Activity {
    private static GameMap map = GameMap.INSTANCE;

    private class NavigationOnClickListener implements View.OnClickListener {
        private Coordinate targetCoordinate;

        private NavigationOnClickListener(Coordinate targetCoordinate) {
            this.targetCoordinate = targetCoordinate;
        }

        @Override
        public void onClick(View view) {
            if (targetCoordinate == null) {
                Toast.makeText(MapViewActivity.this, R.string.goto_mapitem_error, Toast.LENGTH_SHORT).show();
            } else {
                gotoCoordinate(targetCoordinate);
            }
        }
    }

    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        Intent callingIntent = getIntent();

        Coordinate coordinate;
        coordinate = (Coordinate) callingIntent.getSerializableExtra(BundleKeys.COORDINATE);
        if (coordinate == null) {
            coordinate = new Coordinate(1, 1);
        }

        GameMapItem mapItem = map.getMapItemFor(coordinate);

        setContentView(R.layout.main);

        Display display = getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        int width = size.x;
        int height = size.y;


        RelativeLayout layout = (RelativeLayout) findViewById(R.id.layout);
        layout.getLayoutParams().height = height - 150;

        ImageView background = new ImageView(this);

        Log.e(MapViewActivity.class.getName(), mapItem.toString());
        Drawable drawable = getResources().getDrawable(mapItem.getDrawable());
        background.setImageDrawable(drawable);
        background.setScaleType(ImageView.ScaleType.FIT_XY);

        layout.addView(background);

        setButtonNavigationAction(mapItem.getWest(), R.id.westButton);
        setButtonNavigationAction(mapItem.getEast(), R.id.eastButton);
        setButtonNavigationAction(mapItem.getSouth(), R.id.southButton);
        setButtonNavigationAction(mapItem.getNorth(), R.id.northButton);

        addDummyHeads(width, layout);
    }

    private void setButtonNavigationAction(GameMapItem targetMapItem, int buttonId) {
        Button button = (Button) findViewById(buttonId);

        if (targetMapItem == null) {
            button.setEnabled(false);
        } else {
            button.setOnClickListener(new NavigationOnClickListener(targetMapItem.getCoordinate()));
        }
    }


    private void addDummyHeads(int width, RelativeLayout layout) {
        Drawable headDrawable = getResources().getDrawable(R.drawable.head);

        ImageView head1 = getHead(width, headDrawable, 0, 0);
        layout.addView(head1);

        ImageView head2 = getHead(width, headDrawable, -10, 10);
        layout.addView(head2);

        ImageView head3 = getHead(width, headDrawable, -20, 20);
        layout.addView(head3);
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

    private void gotoCoordinate(Coordinate coordinate) {
        Intent intent = new Intent(this, MapViewActivity.class);
        intent.putExtra(BundleKeys.COORDINATE, coordinate);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivity(intent);
    }
}
