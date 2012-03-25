package de.hsa.otma.android.player;

import de.hsa.otma.android.map.Coordinate;
import de.hsa.otma.android.map.GameMap;
import de.hsa.otma.android.map.GameMapItem;
import de.hsa.otma.android.map.MapDirection;

public class PlayerService {
    public static final PlayerService INSTANCE = new PlayerService();

    private Player humanPlayer;
    private static final GameMap GAME_MAP = GameMap.INSTANCE;

    private PlayerService() {
        humanPlayer = new Player(new Coordinate(1, 1), "human");
    }

    public GameMapItem move(MapDirection direction) {
        GameMapItem currentMapItem = getCurrentMapItem();

        GameMapItem newMapItem = currentMapItem.getMapItemFor(direction);
        if (newMapItem == null) return null;

        humanPlayer.moveTo(newMapItem.getCoordinate());

        return newMapItem;
    }

    public GameMapItem getCurrentMapItem() {
        Coordinate currentCoordinate = humanPlayer.getCoordinate();
        return GAME_MAP.getMapItemFor(currentCoordinate);
    }
}
