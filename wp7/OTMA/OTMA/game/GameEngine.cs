
/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 * 
 *                  Copyright (C) 2012                  
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 *
 */

using System;
using OTMA.domain;
using OTMA.util;
using System.Collections.Generic;

namespace OTMA.game
{
    /// <summary>
    /// The class which holds all game logic, game states, the GameBoard, the Users, Hints, and Stories. It also possess the game manipulation methods (e.g. moving).
    /// </summary>
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
                    //TODO multiple avatars
                    default:
                        npc.setImage("/OTMA;component/Images/player_avatar.png");
                        break;
                }
            }
        }

        public GameState getCurrentGameState()
        {
            return state;
        }

        /// <summary>
        /// Random mapping the events to doors.
        /// </summary>
        private void shuffleDoorEvents()
        {
            var doors = board.getAllAvailableDoors();

            foreach (Event roomEvent in events)
            {
                var randomNumber = rand.Next(0, doors.Count);
                doors[randomNumber].setRoomEvent(roomEvent);
                var room = doors[randomNumber].getRoom();

                room.setHints(hints);
                room.setStories(ConfigStub.DEFAULT_STORIES);
                room.setEvent(roomEvent);
                doors.RemoveAt(randomNumber);
            }
        }

        /// <summary>
        /// Return and log an NPCs. this NPC must not be found again to finish the game.
        /// </summary>
        /// <returns>The NPC player at the current position, if available</returns>
        public NpcPlayer getAndLogNpcForCurrentPostition()
        {
            var currentNpc = getNpcForCurrentPosition();
            if (currentNpc != null && !human.foundNpcs.Contains(currentNpc))
            {
                human.foundNpcs.Add(currentNpc);
            }

            return currentNpc;
        }

        /// <summary>
        /// Logs a given hint, so that hint must not be found again.
        /// </summary>
        /// <param name="hint">The hint to log</param>
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
                if (npc.coordinate.Equals(human.coordinate) && state == GameState.OnBoard)
                    return npc;
            }

            return null;
        }

        /// <summary>
        /// Move player to Direction.
        /// </summary>
        /// <param name="direction">the direction which should be moved to</param>
        /// <returns>The new position as BoardElement</returns>
        public BoardElement movePlayer(Direction direction)
        {
            BoardElement currentPosition = null;
            BoardElement newPosition = null;

            if (state == GameState.AtDoor)
            {
                currentPosition = getCurrentDoorItem();

                // leave door
                if (direction != Direction.North)
                {
                    newPosition = (currentPosition as Door).directions[Direction.South];
                    state = GameState.OnBoard;
                }
                // enter room if there is a event
                else if ((currentPosition as Door).roomEvent != null)
                {
                    newPosition = (currentPosition as Door).directions[Direction.North];
                    state = GameState.InRoom;
                }
            }
            else if (state == GameState.AtExitDoor)
            {
                currentPosition = getCurrentDoorItem();

                if (direction != Direction.North)
                {
                    newPosition = (currentPosition as ExitDoor).directions[Direction.South];
                    state = GameState.OnBoard;
                }
                else
                {
                    if (this.checkIfAllRequirementsAreSatisfied())
                    {
                        newPosition = (currentPosition as ExitDoor).directions[Direction.North];
                        state = GameState.Done;
                    }
                }
            }
            else if (state == GameState.InRoom && direction == Direction.South)
            {
                currentPosition = getCurrentRoomItem();

                // leave room
                newPosition = currentPosition.directions[Direction.South];
                state = GameState.AtDoor;

                return newPosition;
            }
            else
            {
                currentPosition = getCurrentBoardItem();
                newPosition = currentPosition.getBoardItemForDirection(direction);
            }

            if (newPosition != null)
            {
                if (newPosition is ExitDoor)
                {
                    human.setCoordinate(newPosition.coordinate);
                    state = GameState.AtExitDoor;
                }
                else
                {
                    human.setCoordinate(newPosition.coordinate);

                    if (newPosition is Door)
                        state = GameState.AtDoor;

                    stepCounter++;
                    if (stepCounter % ConfigStub.STEP_COUNT == 0)
                    {
                        shuffleNpcs();
                    }
                }
            }

            return newPosition;
        }

        private void shuffleNpcs()
        {
            var boardElements = board.getAllAvailableRooms();

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

        public Boolean checkIfAllRequirementsAreSatisfied()
        {
            return human.foundHints.Count >= ConfigStub.NEEDED_HINT_AMOUNT && human.foundNpcs.Count >= ConfigStub.NEEDED_NPC_AMOUNT;
        }

    }
}
