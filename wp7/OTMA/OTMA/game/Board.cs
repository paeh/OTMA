using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using System.Collections.Generic;
using OTMA.domain;

namespace OTMA.game
{
    public class Board
    {
        public static readonly Board instance = new Board();

        private Dictionary<Coordinate, BoardElement> board = new Dictionary<Coordinate, BoardElement>();

        public Board()
        {
            createBoard();
        }

        public void createBoard()
        {
            var map1x1 = createAndAddBoardElement(1, 1, "/OTMA;component/Images/1x1.png");
            var map1x2 = createAndAddBoardElement(1, 2, "/OTMA;component/Images/1x2.png");
            var map1x3 = createAndAddBoardElement(1, 3, "/OTMA;component/Images/1x3.png");
            var map1x4 = createAndAddBoardElement(1, 4, "/OTMA;component/Images/1x4.png");
            var map1x5 = createAndAddBoardElement(1, 5, "/OTMA;component/Images/1x5.png");

            var map2x1 = createAndAddBoardElement(2, 1, "/OTMA;component/Images/2x1.png");
            var map2x2 = createAndAddBoardElement(2, 2, "/OTMA;component/Images/2x2.png");
            var map2x3 = createAndAddBoardElement(2, 3, "/OTMA;component/Images/2x3.png");
            var map2x4 = createAndAddBoardElement(2, 4, "/OTMA;component/Images/2x4.png");
            var map2x5 = createAndAddBoardElement(2, 5, "/OTMA;component/Images/2x5.png");

            var map3x1 = createAndAddBoardElement(3, 1, "/OTMA;component/Images/3x1.png");
            var map3x2 = createAndAddBoardElement(3, 2, "/OTMA;component/Images/3x2.png");
            var map3x3 = createAndAddBoardElement(3, 3, "/OTMA;component/Images/3x3.png");
            var map3x4 = createAndAddBoardElement(3, 4, "/OTMA;component/Images/3x4.png");
            var map3x5 = createAndAddBoardElement(3, 5, "/OTMA;component/Images/3x5.png");

            var map4x1 = createAndAddBoardElement(4, 1, "/OTMA;component/Images/4x1.png");
            var map4x2 = createAndAddBoardElement(4, 2, "/OTMA;component/Images/4x2.png");
            var map4x3 = createAndAddBoardElement(4, 3, "/OTMA;component/Images/4x3.png");
            var map4x4 = createAndAddBoardElement(4, 4, "/OTMA;component/Images/4x4.png");
            var map4x5 = createAndAddBoardElement(4, 5, "/OTMA;component/Images/4x5.png");

            var map5x1 = createAndAddBoardElement(5, 1, "/OTMA;component/Images/5x1.png");
            var map5x2 = createAndAddBoardElement(5, 2, "/OTMA;component/Images/5x2.png");
            var map5x3 = createAndAddBoardElement(5, 3, "/OTMA;component/Images/5x3.png");
            var map5x4 = createAndAddBoardElement(5, 4, "/OTMA;component/Images/5x4.png");
            var map5x5 = createAndAddBoardElement(5, 5, "/OTMA;component/Images/5x5.png");

            map1x1.setBoundaryItems(null, null, map2x1, null);
            map1x2.setBoundaryItems(null, map1x3, map2x2, null);
            map1x3.setBoundaryItems(null, map1x4, map2x3, map1x2);
            map1x4.setBoundaryItems(null, map1x5, null, map1x3);
            map1x5.setBoundaryItems(null, null, null, map1x4);

            map2x1.setBoundaryItems(map1x1, map2x2, map3x1, null);
            map2x2.setBoundaryItems(map1x2, null, null, map2x1);
            map2x3.setBoundaryItems(map1x3, null, map3x3, null);
            map2x4.setBoundaryItems(null, map2x5, null, null);
            map2x5.setBoundaryItems(null, null, map3x5, map2x4);

            map3x1.setBoundaryItems(map2x1, null, map4x1, null);
            map3x2.setBoundaryItems(null, map3x3, map4x2, null);
            map3x3.setBoundaryItems(map2x3, map3x4, null, map3x2);
            map3x4.setBoundaryItems(null, map3x5, null, map3x3);
            map3x5.setBoundaryItems(map2x5, null, map4x5, map3x4);

            map4x1.setBoundaryItems(map3x1, map4x2, map5x1, null);
            map4x2.setBoundaryItems(map3x2, map4x3, null, map4x1);
            map4x3.setBoundaryItems(null, null, map5x3, map4x2);
            map4x4.setBoundaryItems(null, map4x5, map5x4, null);
            map4x5.setBoundaryItems(map3x5, null, map5x5, map4x4);

            map5x1.setBoundaryItems(map4x1, map5x2, null, null);
            map5x2.setBoundaryItems(null, map5x3, null, map5x1);
            map5x3.setBoundaryItems(map4x3, map5x4, null, map5x2);
            map5x4.setBoundaryItems(map4x4, null, null, map5x3);
            map5x5.setBoundaryItems(map4x5, null, null, null);             

        }

        private BoardElement createAndAddBoardElement(int x, int y, String img)
        {
            var coordinate = new Coordinate(x, y);
            var element = new BoardElement(coordinate, img); 
            board.Add(coordinate, element);

            return element;
        }

        public BoardElement getBoardElementForCoordinates(Coordinate coordinate)
        {
            if (board.ContainsKey(coordinate))
            {
                return board[coordinate];
            }

            return null;            
        }
    }

    
}
