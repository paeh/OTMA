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
using OTMA.domain;

namespace OTMA.game
{
    public class GameEngine
    {
        public static GameEngine instance = new GameEngine();

        private Board board = Board.instance;
        private Player human = null;
        private int stepCounter = 0;

        private GameEngine()
        {
            human = new HumanPlayer(1, 1);
        }

        public BoardElement movePlayer(Direction direction)
        {
            var item = getCurrentBoardItem();
            BoardElement newPosition = item.getBoardItemForDirection(direction);

            if (newPosition != null)
            {
                human.setCoordinate(newPosition.coordinate);
                stepCounter++;
                if (stepCounter % 2 == 0)
                {
                    moveNpcs();
                }
            }
            return newPosition;
        }

        public void moveNpcs()
        {

        }

        private BoardElement getCurrentBoardItem()
        {
            return board.getBoardElementForCoordinates(human.coordinate);
        }

    }
}
