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
using OTMA.domain;
using System.Collections.Generic;

namespace OTMA.util
{
    public class ConfigStub
    {
        public static readonly String RECEPTION_TEXT = "All hints available in the game will be given to you on win!";
        public static int NEEDED_NPC_AMOUNT = 1;
        public static int NEEDED_HINT_AMOUNT = 1;
        public static List<Hint> FINAL_HINTS = new List<Hint>() { new Hint("", "") };
        public static List<Story> FINAL_STORIES = new List<Story>() { new Story("Finish", "") };
        public static List<Story> DEFAULT_STORIES = new List<Story>() { new Story("", "e=mc²"), new Story("", "dummy1"), new Story("", "dummy2"), new Story("", "your only limit is your own imagination") };
    }
}
