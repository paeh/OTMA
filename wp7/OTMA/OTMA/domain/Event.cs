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
    public class Event
    {
        public String title { private set; get; }
        public String shortTitle { private set; get; }

        public Event(String title, String shortTitle)
        {
            this.title = title;
            this.shortTitle = shortTitle;
        }
    }
}
