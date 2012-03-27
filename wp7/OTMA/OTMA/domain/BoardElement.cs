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

    public class BoardElement
    {
        public BoardElement north { private set; get; }
        public BoardElement south { private set; get; }
        public BoardElement west { private set; get; }
        public BoardElement east { private set; get; }
        public Coordinate coordinate { private set; get; }
        public String picture { private set; get; }

        public BoardElement(BoardElement north, BoardElement south, BoardElement west, BoardElement east, Coordinate coordinate, String picture)
        {
            this.north = north;
            this.west = west;
            this.south = south;
            this.east = east;
            this.coordinate = coordinate;
            this.picture = picture;
        }
    }
}
