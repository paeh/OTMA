package de.hsa.otma.android;

import android.app.Application;
import android.util.Log;
import de.hsa.otma.android.config.XMLConfig;

public class OTMAApplication extends Application {

    private static final String TAG = "otma";
    
    private static final String CONFIG_FILE_URL = "http://www.hs-augsburg.de/~jleimer/otma/config.xml";

    @Override
    public void onCreate() {
        super.onCreate();

        XMLConfig config = new XMLConfig();
        config.load(CONFIG_FILE_URL);

        Log.e(TAG, config.getHints().toString());
        Log.e(TAG, config.getNPCPlayers().toString());
        Log.e(TAG, config.getRooms().toString());
    }
}
