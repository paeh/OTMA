﻿using System;
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
}