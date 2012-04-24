
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
