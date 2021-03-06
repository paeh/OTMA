﻿
/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 * 
 *                  Copyright (C) 2012                  
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 *
 */

using System;
using OTMA.workaround;

namespace OTMA.domain
{
    /// <summary>
    /// The class which implements the user player.
    /// </summary>
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
