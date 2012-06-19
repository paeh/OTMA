using System;
using OTMA.domain;
using System.Collections.Generic;

namespace OTMA.util
{
    /// <summary>
    /// The class which contains all static Strings and configurations.
    /// </summary>
    public class ConfigStub
    {
        public static readonly String RECEPTION_TEXT = "All hints available in the game will be given to you on win!";
        public static readonly String END_TEXT = "You won! Click here for more Information.";
        public static readonly String END_URL = "http://www.onthemove-academy.org/";
        public static readonly int NEEDED_NPC_AMOUNT = 1;
        public static readonly int NEEDED_HINT_AMOUNT = 1;
        public static readonly int STEP_COUNT = 5;
        public static readonly String XML_URL = "http://hs-augsburg.de/~lieback/pub/otma-config-game.xml";
        public static List<Hint> FINAL_HINTS = new List<Hint>() { new Hint("", "") };
        public static List<Story> FINAL_STORIES = new List<Story>() { new Story("Finish", "") };
        public static List<Story> DEFAULT_STORIES = new List<Story>() { new Story("", "e=mc²"), new Story("", "dummy1"), new Story("", "dummy2"), new Story("", "your only limit is your own imagination") };
    }
}
