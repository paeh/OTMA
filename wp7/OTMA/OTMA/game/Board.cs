
/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 * 
 *                  Copyright (C) 2012                  
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 *
 */

using System;
using System.Collections.Generic;
using OTMA.domain;

namespace OTMA.game
{
    public class Board
    {
        public static readonly Board instance = new Board();

        private Dictionary<Coordinate, BoardElement> board = new Dictionary<Coordinate, BoardElement>();
        private Dictionary<Coordinate, Door> doors = new Dictionary<Coordinate, Door>();
        private Dictionary<Coordinate, Room> rooms = new Dictionary<Coordinate, Room>();

        public Board()
        {
            createBoard();
        }

        public List<Door> getAllAvailableDoors()
        {
            var result = new List<Door>();
            foreach (Door door in doors.Values)
            {
                if (!(door is ExitDoor))
                    result.Add(door);
            }

            return result;
        }

        public List<BoardElement> getAllAvailableRooms()
        {
            var result = new List<BoardElement>();
            foreach (Room room in rooms.Values)
            {
                if (!(room is ExitRoom))
                    result.Add(room);
            }

            return result;
        }

        private void createBoard()
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

            var door1x2 = createAndAddDoor(1, 2, "/OTMA;component/Images/door.png");
            var door1x5 = createAndAddDoor(1, 5, "/OTMA;component/Images/door.png");
            var door2x1 = createAndAddDoor(2, 1, "/OTMA;component/Images/door.png");
            var door2x2 = createAndAddDoor(2, 2, "/OTMA;component/Images/door.png");
            var door2x4 = createAndAddDoor(2, 4, "/OTMA;component/Images/door.png");
            var door2x5 = createAndAddDoor(2, 5, "/OTMA;component/Images/door.png");
            var door3x1 = createAndAddDoor(3, 1, "/OTMA;component/Images/door.png");
            var door3x2 = createAndAddDoor(3, 2, "/OTMA;component/Images/door.png");
            var door3x4 = createAndAddDoor(3, 4, "/OTMA;component/Images/door.png");
            //var door3x5 = createAndAddDoor(3, 5, "/OTMA;component/Images/door.png");

            var exitDoor = createExitDoor(map3x5);

            var door4x1 = createAndAddDoor(4, 1, "/OTMA;component/Images/door.png");            
            var door4x3 = createAndAddDoor(4, 3, "/OTMA;component/Images/door.png");
            var door4x4 = createAndAddDoor(4, 4, "/OTMA;component/Images/door.png");
            var door5x2 = createAndAddDoor(5, 2, "/OTMA;component/Images/door.png");
            var door5x5 = createAndAddDoor(5, 5, "/OTMA;component/Images/door.png");

            var room1x2 = createAndAddRoom(1, 2, "");
            var room1x5 = createAndAddRoom(1, 5, "");
            var room2x1 = createAndAddRoom(2, 1, "");
            var room2x2 = createAndAddRoom(2, 2, "");
            var room2x4 = createAndAddRoom(2, 4, "");
            var room2x5 = createAndAddRoom(2, 5, "");
            var room3x1 = createAndAddRoom(3, 1, "");
            var room3x2 = createAndAddRoom(3, 2, "");
            var room3x4 = createAndAddRoom(3, 4, "");
            //var room3x5 = createAndAddRoom(3, 5, "");
            var room4x1 = createAndAddRoom(4, 1, "");
            var room4x3 = createAndAddRoom(4, 3, "");
            var room4x4 = createAndAddRoom(4, 4, "");
            var room5x2 = createAndAddRoom(5, 2, "");
            var room5x5 = createAndAddRoom(5, 5, "");

            door1x2.setBoundaryItems(room1x2, null, map1x2, null);
            door1x5.setBoundaryItems(room1x5, null, map1x5, null);
            door2x1.setBoundaryItems(room2x1, null, map2x1, null);
            door2x2.setBoundaryItems(room2x2, null, map2x2, null);
            door2x4.setBoundaryItems(room2x4, null, map2x4, null);
            door2x5.setBoundaryItems(room2x5, null, map2x5, null);
            door3x1.setBoundaryItems(room3x1, null, map3x1, null);
            door3x2.setBoundaryItems(room3x2, null, map3x2, null);
            door3x4.setBoundaryItems(room3x4, null, map3x4, null);
            //door3x5.setBoundaryItems(room3x5, null, map3x5, null);
            door4x1.setBoundaryItems(room4x1, null, map4x1, null);
            door4x3.setBoundaryItems(room4x3, null, map4x3, null);
            door4x4.setBoundaryItems(room4x4, null, map4x4, null);
            door5x2.setBoundaryItems(room5x2, null, map5x2, null);
            door5x5.setBoundaryItems(room5x5, null, map5x5, null);

            room1x2.setBoundaryItems(null, null, door1x2, null);
            room1x5.setBoundaryItems(null, null, door1x5, null);
            room2x1.setBoundaryItems(null, null, door2x1, null);
            room2x2.setBoundaryItems(null, null, door2x2, null);
            room2x4.setBoundaryItems(null, null, door2x4, null);
            room2x5.setBoundaryItems(null, null, door2x5, null);
            room3x1.setBoundaryItems(null, null, door3x1, null);
            room3x2.setBoundaryItems(null, null, door3x2, null);
            room3x4.setBoundaryItems(null, null, door3x4, null);
            //room3x5.setBoundaryItems(null, null, door3x5, null);
            room4x1.setBoundaryItems(null, null, door4x1, null);
            room4x3.setBoundaryItems(null, null, door4x3, null);
            room4x4.setBoundaryItems(null, null, door4x4, null);
            room5x2.setBoundaryItems(null, null, door5x2, null);
            room5x5.setBoundaryItems(null, null, door5x5, null);
                                                 

            map1x1.setBoundaryItems(null, null, map2x1, null);
            map1x2.setBoundaryItems(door1x2, map1x3, map2x2, null);
            map1x3.setBoundaryItems(null, map1x4, map2x3, map1x2);
            map1x4.setBoundaryItems(null, map1x5, null, map1x3);
            map1x5.setBoundaryItems(null, null, door1x5, map1x4);
            map2x1.setBoundaryItems(map1x1, map2x2, map3x1, door2x1);
            map2x2.setBoundaryItems(map1x2, door2x2, null, map2x1);
            map2x3.setBoundaryItems(map1x3, null, map3x3, null);
            map2x4.setBoundaryItems(null, map2x5, null, door2x4);
            map2x5.setBoundaryItems(door2x5, null, map3x5, map2x4);
            map3x1.setBoundaryItems(map2x1, door3x1, map4x1, null);
            map3x2.setBoundaryItems(door3x2, map3x3, map4x2, null);
            map3x3.setBoundaryItems(map2x3, map3x4, null, map3x2);
            map3x4.setBoundaryItems(null, map3x5, door3x4, map3x3);
            //map3x5.setBoundaryItems(map2x5, door3x5, map4x5, map3x4);
            map3x5.setBoundaryItems(map2x5, exitDoor, map4x5, map3x4);
            map4x1.setBoundaryItems(map3x1, map4x2, map5x1, door4x1);
            map4x2.setBoundaryItems(map3x2, map4x3, null, map4x1);
            map4x3.setBoundaryItems(null, door4x3, map5x3, map4x2);
            map4x4.setBoundaryItems(door4x4, map4x5, map5x4, null);
            map4x5.setBoundaryItems(map3x5, null, map5x5, map4x4);
            map5x1.setBoundaryItems(map4x1, map5x2, null, null);
            map5x2.setBoundaryItems(door5x2, map5x3, null, map5x1);
            map5x3.setBoundaryItems(map4x3, map5x4, null, map5x2);
            map5x4.setBoundaryItems(map4x4, null, null, map5x3);
            map5x5.setBoundaryItems(map4x5, null, null, door5x5);             

        }

        private ExitDoor createExitDoor(BoardElement map3x5)
        {
            var coordinate = new Coordinate(3, 5);
            var exitDoor = new ExitDoor(coordinate, "/OTMA;component/Images/door.png");
            var exitEvent = new Event("Finish", "Finish", "img");
            var exitRoom = new Room(coordinate, "img");

            exitDoor.setRoomEvent(exitEvent);
            exitDoor.setBoundaryItems(exitRoom, null, map3x5, null);
            doors.Add(coordinate, exitDoor);

            exitRoom.setHints(new List<Hint>() { new Hint("Final title1", "bla1"), new Hint("Final title2", "bla2"), new Hint("Final title3", "bla3") });
            exitRoom.setStories(new List<Story>() { new Story("Final title4", "bla4"), new Story("Final title5", "bla5"), new Story("Final title6", "bla6") });
            exitRoom.setEvent(exitEvent);
            rooms.Add(coordinate, exitRoom);

            return exitDoor;
        }

        private Door createAndAddDoor(int x, int y, String img)
        {
            var coordinate = new Coordinate(x, y);
            var door = new Door(coordinate, img);
            doors.Add(coordinate, door);

            return door;
        }

        private BoardElement createAndAddBoardElement(int x, int y, String img)
        {
            var coordinate = new Coordinate(x, y);
            var element = new BoardElement(coordinate, img); 
            board.Add(coordinate, element);

            return element;
        }

        private Room createAndAddRoom(int x, int y, String img)
        {
            var coordinate = new Coordinate(x, y);
            var room = new Room(coordinate, img);
            rooms.Add(coordinate, room);

            return room;
        }

        public BoardElement getBoardElementForCoordinates(Coordinate coordinate)
        {
            if (board.ContainsKey(coordinate))
            {
                return board[coordinate];
            }

            return null;            
        }

        public Room getRoomForCoordinates(Coordinate coordinate)
        {
            if (rooms.ContainsKey(coordinate))
            {
                return rooms[coordinate];
            }

            return null;
        }

        public Door getDoorForCoordinates(Coordinate coordinate)
        {
            if (doors.ContainsKey(coordinate))
            {
                return doors[coordinate];
            }

            return null;
        }
    }

    
}
