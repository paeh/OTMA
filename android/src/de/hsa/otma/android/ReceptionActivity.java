package de.hsa.otma.android;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;


/**
 * Activity displaying welcome screen.
 */
public class ReceptionActivity extends Activity{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        createLayout();
        setUpEnterButton();
    }

    private void createLayout() {
        setContentView(R.layout.reception);

        disableDirectionalButtons();
        disableAskButton();
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

    private void disableAskButton() {
        Button askButton = (Button) findViewById(R.id.npcButton);
        askButton.setVisibility(View.INVISIBLE);
    }

    private void setUpEnterButton(){
        Button enterButton = (Button) findViewById(R.id.enterButton);
        enterButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent mapViewIntent = new Intent(ReceptionActivity.this, MapViewActivity.class);
                ReceptionActivity.this.startActivity(mapViewIntent);
            }
        });
    }
}
