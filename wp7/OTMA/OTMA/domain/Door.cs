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
}
