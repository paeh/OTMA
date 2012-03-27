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
    public class Coordinate
    {
        public int x { private set; get; }
        public int y { private set; get; }

        public Coordinate(int x, int y)
        {
            this.x = x;
            this.y = y;
        }

        public override bool Equals(object obj)
        {
            if (obj is Coordinate)
            {
                var otherCoordinate = obj as Coordinate;

                if (this.x == otherCoordinate.x && this.y == otherCoordinate.y)
                    return true;
            }

            return false;
        }

        public override int GetHashCode()
        {
            return x + y;
        }
    }
}
