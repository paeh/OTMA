
/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 * 
 *                  Copyright (C) 2012                  
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
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

namespace OTMA.domain
{
    /// <summary>
    /// Wrapper class for Events which will be take place in rooms.
    /// </summary>
    public class Event
    {
        public String title { private set; get; }
        public String shortTitle { private set; get; }
        public String description { private set; get; }

        public Event(String title, String shortTitle, String description)
        {
            this.title = title;
            this.shortTitle = shortTitle;
            this.description = description;
        }
    }
}
