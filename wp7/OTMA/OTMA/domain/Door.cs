﻿
/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 * 
 *                  Copyright (C) 2012                  
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 *
 */

using System;
using System.Collections.Generic;

namespace OTMA.domain
{
    /// <summary>
    /// Door implementation as Boardelement. Is used to place enterable doors to the game board.
    /// </summary>
    public class Door: BoardElement
    {
        public Door(Coordinate coordinate, String picture)
            : base(coordinate, picture)
        {
        }

        public Event roomEvent { private set; get; }

        public void setRoomEvent(Event roomEvent)
        {
            this.roomEvent = roomEvent;
        }

        public Room getRoom()
        {
            return (this.directions[Direction.North] as Room);
        }

        public override List<Direction> getAvailableDirections()
        {
            List<Direction> result = new List<Direction>();

            foreach (Direction key in directions.Keys)
            {
                if (directions[key] != null && roomEvent != null)
                    result.Add(key);
            }

            if (result.Count < 1)
                result.Add(Direction.South);

            return result;
        }
    }

    public class ExitDoor : Door
    {
        public ExitDoor(Coordinate coordinate, String picture)
            : base(coordinate, picture)
        {
        }

    }
}
