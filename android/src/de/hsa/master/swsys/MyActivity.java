package de.hsa.master.swsys;

import android.app.Activity;
import android.graphics.Point;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.Display;
import android.widget.ImageView;
import android.widget.RelativeLayout;

public class MyActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        Display display = getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        int width = size.x;
        int height = size.y;

        Drawable backDrawable = getResources().getDrawable(R.drawable.back);
        Drawable headDrawable = getResources().getDrawable(R.drawable.head);

        RelativeLayout layout = (RelativeLayout) findViewById(R.id.layout);
        layout.getLayoutParams().height = height - 150;

        ImageView background = new ImageView(this);
        background.setImageDrawable(backDrawable);
        background.setScaleType(ImageView.ScaleType.FIT_XY);

        layout.addView(background);

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
}
