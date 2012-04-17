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
using OTMA.workaround;

namespace OTMA.domain
{
    public class Player
    {
        public String name { protected set; get; }
        public Coordinate coordinate { protected set; get; }

        public void setCoordinate(Coordinate coordinate)
        {
            this.coordinate = coordinate;
        }

        public void setName(String name)
        {
            this.name = name;
        }
    }

    public class NpcPlayer: Player
    {
        public String role { private set; get; }
        public String picture { private set; get; }
        public HashSet<Hint> hints { private set; get; }

        public NpcPlayer(String name, String role, Hint text)
            : base()
        {
            this.name = name;
            this.role = role;
            this.hints = new HashSet<Hint>();
            hints.Add(text);
        }

        public void setImage(String image)
        {
            this.picture = image;
        }
    }

    public class HumanPlayer: Player
    {

        public HumanPlayer(int x, int y)
        {
            base.coordinate = new Coordinate(x, y);
            foundHints = new HashSet<Hint>();
            foundNpcs = new HashSet<NpcPlayer>();
        }

        public HashSet<Hint> foundHints { private set; get; }
        public HashSet<NpcPlayer> foundNpcs { private set; get; }
    }
}
