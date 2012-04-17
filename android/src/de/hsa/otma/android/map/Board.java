package de.hsa.otma.android.map;

import de.hsa.otma.android.R;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class Board {
    public static final Board INSTANCE = new Board();
    private Map<Coordinate, BoardElement> elements = new HashMap<Coordinate, BoardElement>();

    private Board() {
        buildBoard();
    }

    private void buildBoard() {
        BoardElement map1x1 = createBoardElementAndPutToBoard(1, 1, R.drawable.map_1x1);
        BoardElement map1x2 = createBoardElementAndPutToBoard(2, 1, R.drawable.map_1x2);
        BoardElement map1x3 = createBoardElementAndPutToBoard(3, 1, R.drawable.map_1x3);
        BoardElement map1x4 = createBoardElementAndPutToBoard(4, 1, R.drawable.map_1x4);
        BoardElement map1x5 = createBoardElementAndPutToBoard(5, 1, R.drawable.map_1x5);
        BoardElement map2x1 = createBoardElementAndPutToBoard(1, 2, R.drawable.map_2x1);
        BoardElement map2x2 = createBoardElementAndPutToBoard(2, 2, R.drawable.map_2x2);
        BoardElement map2x3 = createBoardElementAndPutToBoard(3, 2, R.drawable.map_2x3);
        BoardElement map2x4 = createBoardElementAndPutToBoard(4, 2, R.drawable.map_2x4);
        BoardElement map2x5 = createBoardElementAndPutToBoard(5, 2, R.drawable.map_2x5);
        BoardElement map3x1 = createBoardElementAndPutToBoard(1, 3, R.drawable.map_3x1);
        BoardElement map3x2 = createBoardElementAndPutToBoard(2, 3, R.drawable.map_3x2);
        BoardElement map3x3 = createBoardElementAndPutToBoard(3, 3, R.drawable.map_3x3);
        BoardElement map3x4 = createBoardElementAndPutToBoard(4, 3, R.drawable.map_3x4);
        BoardElement map3x5 = createBoardElementAndPutToBoard(5, 3, R.drawable.map_3x5);
        BoardElement map4x1 = createBoardElementAndPutToBoard(1, 4, R.drawable.map_4x1);
        BoardElement map4x2 = createBoardElementAndPutToBoard(2, 4, R.drawable.map_4x2);
        BoardElement map4x3 = createBoardElementAndPutToBoard(3, 4, R.drawable.map_4x3);
        BoardElement map4x4 = createBoardElementAndPutToBoard(4, 4, R.drawable.map_4x4);
        BoardElement map4x5 = createBoardElementAndPutToBoard(5, 4, R.drawable.map_4x5);
        BoardElement map5x1 = createBoardElementAndPutToBoard(1, 5, R.drawable.map_5x1);
        BoardElement map5x2 = createBoardElementAndPutToBoard(2, 5, R.drawable.map_5x2);
        BoardElement map5x3 = createBoardElementAndPutToBoard(3, 5, R.drawable.map_5x3);
        BoardElement map5x4 = createBoardElementAndPutToBoard(4, 5, R.drawable.map_5x4);
        BoardElement map5x5 = createBoardElementAndPutToBoard(5, 5, R.drawable.map_5x5);

        map1x1.setBoundaryElements(null, null, map2x1, null);
        map1x2.setBoundaryElements(null, map1x3, map2x2, null);
        map1x3.setBoundaryElements(null, map1x4, map2x3, map1x2);
        map1x4.setBoundaryElements(null, map1x5, null, map1x3);
        map1x5.setBoundaryElements(null, null, null, map1x4);

        map2x1.setBoundaryElements(map1x1, map2x2, map3x1, null);
        map2x2.setBoundaryElements(map1x2, null, null, map2x1);
        map2x3.setBoundaryElements(map1x3, null, map3x3, null);
        map2x4.setBoundaryElements(null, map2x5, null, null);
        map2x5.setBoundaryElements(null, null, map3x5, map2x4);

        map3x1.setBoundaryElements(map2x1, null, map4x1, null);
        map3x2.setBoundaryElements(null, map3x3, map4x2, null);
        map3x3.setBoundaryElements(map2x3, map3x4, null, map3x2);
        map3x4.setBoundaryElements(null, map3x5, null, map3x3);
        map3x5.setBoundaryElements(map2x5, null, map4x5, map3x4);

        map4x1.setBoundaryElements(map3x1, map4x2, map5x1, null);
        map4x2.setBoundaryElements(map3x2, map4x3, null, map4x1);
        map4x3.setBoundaryElements(null, null, map5x3, map4x2);
        map4x4.setBoundaryElements(null, map4x5, map5x4, null);
        map4x5.setBoundaryElements(map3x5, null, map5x5, map4x4);

        map5x1.setBoundaryElements(map4x1, map5x2, null, null);
        map5x2.setBoundaryElements(null, map5x3, null, map5x1);
        map5x3.setBoundaryElements(map4x3, map5x4, null, map5x2);
        map5x4.setBoundaryElements(map4x4, null, null, map5x3);
        map5x5.setBoundaryElements(map4x5, null, null, null);
    }

    private Random random = new Random(System.nanoTime());

    public Coordinate getRandomCoordinateOnBoard() {
        int x = random.nextInt(5) + 1;
        int y = random.nextInt(5) + 1;

        return new Coordinate(x, y);
    }

    private BoardElement createBoardElementAndPutToBoard(int x, int y, int drawable) {
        Coordinate coordinate = new Coordinate(x, y);
        BoardElement boardElement = new BoardElement(coordinate, drawable);
        elements.put(coordinate, boardElement);

        return boardElement;
    }
    
    public BoardElement getElementFor(Coordinate coordinate) {
        return elements.get(coordinate);
    }
}
