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
using OTMA.domain;

namespace OTMA.game
{
    public class Board
    {
        private Dictionary<Coordinate, BoardElement> board = new Dictionary<Coordinate, BoardElement>();

        public void createBoard()
        {
            // /OTMA;component/Images/1x2.png
        }
    }

    
}
