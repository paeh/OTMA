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

    public class BoardElement
    {
        public Dictionary<Direction, BoardElement> directions = new Dictionary<Direction, BoardElement>();
        public Coordinate coordinate { private set; get; }
        public String picture { private set; get; }

        public BoardElement(Coordinate coordinate, String picture)
        {
            this.coordinate = coordinate;
            this.picture = picture;
        }

        public void setBoundaryItems(BoardElement north, BoardElement east, BoardElement south, BoardElement west)
        {
            this.directions.Add(Direction.North, north);
            this.directions.Add(Direction.East, east);
            this.directions.Add(Direction.South, south);
            this.directions.Add(Direction.West, west);
        }

        public BoardElement getBoardItemForDirection(Direction direction)
        {
            if (directions.ContainsKey(direction))
                return directions[direction];

            return null;
        }

        public virtual List<Direction> getAvailableDirections()
        {
            List<Direction> result = new List<Direction>();

            foreach (Direction key in directions.Keys)
            {
                if (directions[key] != null)
                    result.Add(key);
            }

            return result;
        }
    }
}
