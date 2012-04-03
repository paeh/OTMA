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
using System.Runtime.CompilerServices;

namespace OTMA.domain
{
    public class Room: BoardElement
    {
        private static Random rand = new Random(DateTime.Now.Millisecond);

        public List<Hint> hints { private set; get; }
        public List<Story> stories { private set; get; }
        public Event roomEvent { private set; get; }

        public Room(Coordinate coordinate, String picture)
            : base(coordinate, picture)
        { }

        public void setStories(List<Story> stories)
        {
            this.stories = stories;
        }

        public void setHints(List<Hint> hints)
        {
            this.hints = hints;
        }

        public void setEvent(Event roomEvent)
        {
            this.roomEvent = roomEvent;
        }

        public Hint getRandomContent()
        {
            if (rand.Next(1, 3) == 1)
            {
                System.Diagnostics.Debug.WriteLine("blubb:" + hints);
                return hints[rand.Next(0, hints.Count)];
            }
            else
            {
                System.Diagnostics.Debug.WriteLine("blubb2:" + stories);
                return stories[rand.Next(0, stories.Count)];
            }
        }
    }

    public class ExitRoom : Room
    {
        public ExitRoom(Coordinate coordinate, String picture)
            : base(coordinate, picture)
        {
        }
    }
}
