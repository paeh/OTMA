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
        public String name { private set; get; }
        public Coordinate coordinate { private set; get; }
    }

    public class NpcPlayer
    {
        public String picture { private set; get; }
        public HashSet<Hint> hints { private set; get; }
    }

    public class HumanPlayer
    {
        public HashSet<Hint> foundHints { private set; get; }
        public HashSet<NpcPlayer> foundNpcs { private set; get; }
    }
}
