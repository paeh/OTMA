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
