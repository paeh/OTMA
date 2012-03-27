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
        public BoardElement backToBoard { private set; get; }
        public Room room { private set; get; }
    }
}
