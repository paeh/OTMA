
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
    /// The Room implementation as BoardElement.
    /// </summary>
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
