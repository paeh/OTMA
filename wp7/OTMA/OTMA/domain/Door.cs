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

namespace OTMA.domain
{
    public class Door: BoardElement
    {
        public Door(Coordinate coordinate, String picture)
            : base(coordinate, picture)
        {
        }

        public Room room { private set; get; }
        public Event roomEvent { private set; get; }

        public void setRoom(Room room)
        {
            this.room = room;
        }

        public void setRoomEvent(Event roomEvent)
        {
            this.roomEvent = roomEvent;
        }
    }
}
