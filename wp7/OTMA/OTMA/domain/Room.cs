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
