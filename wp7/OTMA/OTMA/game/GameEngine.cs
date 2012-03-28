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
using OTMA.util;
using System.Collections.Generic;

namespace OTMA.game
{
    public class GameEngine
    {
        private static Random rand = new Random(DateTime.Now.Millisecond);
        public static GameEngine instance = new GameEngine();
        private XmlParser xmlParser = XmlParser.instance;

        private Board board = Board.instance;
        private Player human = null;
        private int stepCounter = 0;
        private Boolean door = false;

        private List<NpcPlayer> npcs = null;
        private List<Hint> hints = null;
        private List<Event> events = null;

        private GameEngine()
        {
            human = new HumanPlayer(1, 1);
            prepareNpcs();
            events = xmlParser.parseAndGetEvents();
            hints = xmlParser.parseAndGetHints();
            shuffleDoorEvents();
            shuffleNpcs();
        }

        private void prepareNpcs()
        {
            npcs = xmlParser.parseAndGetNpcs();

            foreach (NpcPlayer npc in npcs)
            {
                switch (npc.role)
                {
                    default:
                        npc.setImage("/OTMA;component/Images/player_avatar.png");
                        break;
                }
            }
        }

        public void shuffleDoorEvents()
        {
            var doors = board.getAllAvailableDoors();

            foreach (Event roomEvent in events)
            {
                var randomNumber = rand.Next(0, doors.Count -1);
                doors[randomNumber].setRoomEvent(roomEvent);
                doors.RemoveAt(randomNumber);
            }
        }

        public NpcPlayer getNpcForCurrentPosition()
        {
            foreach (NpcPlayer npc in npcs)
            {
                if(npc.coordinate.Equals(human.coordinate))
                    return npc;

            }

            return null;
        }

        public BoardElement movePlayer(Direction direction)
        {
            BoardElement item = null;
            BoardElement newPosition = null;
            if (door && direction != Direction.North)
            {
                item = getCurrentDoorItem();
                newPosition = (item as Door).directions[Direction.South];
                door = false;
            }
            else if (door && direction == Direction.North)
            {
                //enter the door
                //TODO state machine for room, boardelement, door
            }
            else
            {
                item = getCurrentBoardItem();
                newPosition = item.getBoardItemForDirection(direction);
            }

            if (newPosition != null)
            {
                if (newPosition is Door)
                    door = true;

                human.setCoordinate(newPosition.coordinate);
                stepCounter++;
                if (stepCounter % 5 == 0)
                {
                    shuffleNpcs();
                }
            }

            return newPosition;
        }

        private void shuffleNpcs()
        {
            var boardElements = board.getAllAvailableBoardElements();

            foreach (NpcPlayer npc in npcs)
            {
                var randomNumber = rand.Next(0, boardElements.Count - 1);
                npc.setCoordinate(boardElements[randomNumber].coordinate);
            }
        }

        private BoardElement getCurrentBoardItem()
        {
            return board.getBoardElementForCoordinates(human.coordinate);
        }

        private BoardElement getCurrentDoorItem()
        {
            return board.getDoorForCoordinates(human.coordinate);
        }

    }
}
