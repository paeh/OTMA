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
        private HumanPlayer human = null;
        private int stepCounter = 0;
        private GameState state = GameState.OnBoard;

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
                //TODO avatars
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
                var randomNumber = rand.Next(0, doors.Count);
                doors[randomNumber].setRoomEvent(roomEvent);
                var room = doors[randomNumber].getRoom();
                
                room.setHints(hints);
                room.setStories(new List<Story>() { new Story("", "e=mc²"), new Story("", "dummy1"), new Story("", "dummy2"), new Story("", "your only limit is your own imagination") });
                room.setEvent(roomEvent);
                doors.RemoveAt(randomNumber);
            }
        }

        public NpcPlayer getAndLogNpcForCurrentPostition()
        {
            var currentNpc = getNpcForCurrentPosition();
            if(npcs != null && !human.foundNpcs.Contains(currentNpc))
            {
                human.foundNpcs.Add(currentNpc);
            }

            return currentNpc;
        }

        public void logHint(Hint hint)
        {
            if (hint != null && !human.foundHints.Contains(hint))
            {
                human.foundHints.Add(hint);
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

            if (state == GameState.AtDoor)
            {
                item = getCurrentDoorItem();

                // leave door
                if (direction != Direction.North)
                {
                    newPosition = (item as Door).directions[Direction.South];
                    state = GameState.OnBoard;
                }
                // enter room if there is a event
                else if((item as Door).roomEvent != null)
                {
                    newPosition = (item as Door).directions[Direction.North];
                    state = GameState.InRoom;
                }
            }
            else if (state == GameState.InRoom && direction == Direction.South)
            {
                item = getCurrentRoomItem();

                // leave room
                newPosition = item.directions[Direction.South];
                state = GameState.AtDoor;

                return newPosition;
            }
            else
            {
                item = getCurrentBoardItem();
                newPosition = item.getBoardItemForDirection(direction);
            }

            if (newPosition != null)
            {
                human.setCoordinate(newPosition.coordinate);

                if (newPosition is Door)
                    state = GameState.AtDoor;
                
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
                var randomNumber = rand.Next(0, boardElements.Count);
                npc.setCoordinate(boardElements[randomNumber].coordinate);
            }
        }

        public BoardElement getCurrentBoardItem()
        {
            return board.getBoardElementForCoordinates(human.coordinate);
        }

        public Door getCurrentDoorItem()
        {
            return board.getDoorForCoordinates(human.coordinate);
        }

        public Room getCurrentRoomItem()
        {
            return board.getRoomForCoordinates(human.coordinate);
        }

        public Boolean allRequirementsFulfied()
        {
            return human.foundHints.Count == VictoryRequirements.FOUND_HINT_AMOUNT && human.foundNpcs.Count == VictoryRequirements.FOUND_NPC_AMOUNT;
        }

    }
}
