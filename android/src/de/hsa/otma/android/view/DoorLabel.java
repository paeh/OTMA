package de.hsa.otma.android.view;

import android.widget.RelativeLayout;
import android.widget.TextView;
import de.hsa.otma.android.R;
import de.hsa.otma.android.map.Door;

public class DoorLabel extends TextView {

    public DoorLabel(Door door, RelativeLayout layout) {
        super(layout.getContext());

        setText(door.getAbbreviation());

        setBackgroundColor(R.color.black);
        setPadding(10, 8, 10, 8);

        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.WRAP_CONTENT,
                RelativeLayout.LayoutParams.WRAP_CONTENT);

        params.topMargin = (int) (layout.getLayoutParams().height * 0.25);
        params.addRule(RelativeLayout.CENTER_HORIZONTAL);

        setLayoutParams(params);
    }
}
