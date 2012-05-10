
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
    /// Wrapper class for the hints a room or NPC can have.
    /// </summary>
    public class Hint
    {
        public String text { private set; get; }
        public String title { private set; get; }

        public Hint(String title, String text)
        {
            this.text = text;
            this.title = title;
        }
    }

    public class Story: Hint
    {
        public Story(String title, String text)
            : base(title, text)
        { }

    }
}
