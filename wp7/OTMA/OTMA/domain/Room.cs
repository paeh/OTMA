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

namespace OTMA.domain
{
    public class Room
    {
        public Door door { private set; get; }
        public List<Hint> hints { private set; get; }
        public List<String> stories { private set; get; }
    }
}
