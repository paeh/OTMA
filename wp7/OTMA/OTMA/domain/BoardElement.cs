
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
    /// The BoardElement class. Implements the Elements which will be used to create the whole game board.
    /// </summary>
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

        /// <summary>
        /// Set the surrounding BoardElements.
        /// </summary>
        /// <param name="north">North neighbour</param>
        /// <param name="east">East neighbour</param>
        /// <param name="south">South neighbour</param>
        /// <param name="west">West neighbour</param>
        public void setBoundaryItems(BoardElement north, BoardElement east, BoardElement south, BoardElement west)
        {
            this.directions.Add(Direction.North, north);
            this.directions.Add(Direction.East, east);
            this.directions.Add(Direction.South, south);
            this.directions.Add(Direction.West, west);
        }

        /// <summary>
        /// Get Neighbour for a Direction
        /// </summary>
        /// <param name="direction">The Direction to move to</param>
        /// <returns>The neighbour BoardElement</returns>
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
