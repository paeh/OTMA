package de.hsa.otma.android.player;

import de.hsa.otma.android.map.BoardElement;
import de.hsa.otma.android.map.Coordinate;
import de.hsa.otma.android.map.Board;
import de.hsa.otma.android.map.MapDirection;

public class PlayerService {
    public static final PlayerService INSTANCE = new PlayerService();

    private Player humanPlayer;
    private static final Board BOARD = Board.INSTANCE;

    private PlayerService() {
        humanPlayer = new Player(new Coordinate(1, 1), "human");
    }

    public BoardElement move(MapDirection direction) {
        BoardElement currentMapItem = getCurrentMapItem();

        BoardElement newMapItem = currentMapItem.getMapItemFor(direction);
        if (newMapItem == null) return null;

        humanPlayer.moveTo(newMapItem.getCoordinate());

        return newMapItem;
    }

    public BoardElement getCurrentMapItem() {
        Coordinate currentCoordinate = humanPlayer.getCoordinate();
        return BOARD.getMapItemFor(currentCoordinate);
    }
}
