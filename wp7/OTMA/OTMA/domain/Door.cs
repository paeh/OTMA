/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 * 
 *                  Copyright (C) 2012                  
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 */

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

namespace OTMA.domain
{
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
