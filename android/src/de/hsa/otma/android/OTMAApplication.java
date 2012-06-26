package de.hsa.otma.android;

import android.app.Application;
import de.hsa.otma.android.config.Config;
import de.hsa.otma.android.config.XMLConfig;

/**
 * Class loading and providing config.
 */
public class OTMAApplication extends Application {

//    private static final String CONFIG_FILE_URL = "http://www.onthemove-academy.org/images/documents/otma-config-game-xml.pdf";
//    private static final String CONFIG_FILE_URL = "http://hs-augsburg.de/~lieback/pub/otma-config-game.xml";
    private static final String CONFIG_FILE_URL = "http://www.hs-augsburg.de/~jleimer/otma/config.xml";

    public static Config CONFIG;

    @Override
    public void onCreate() {
        super.onCreate();

        CONFIG = new XMLConfig(CONFIG_FILE_URL);
    }
}
