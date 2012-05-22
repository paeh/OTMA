using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OTMA.game;
using OTMA.domain;
using OTMA.util;

namespace OtmaTest
{
    [TestClass]
    public class GameEngineTest
    {
        [TestMethod]
        public void TestVictory()
        {
            XmlParser.asyncInit("http://hs-augsburg.de/~lieback/pub/otma-config.xml?junk=" + DateTime.Now.ToString(), null);
            var engine = GameEngine.instance;

            Assert.IsFalse(engine.allRequirementsSatisfied());

            for (int i = 0; i < ConfigStub.NEEDED_HINT_AMOUNT; i++)
            {
                engine.logHint(new Hint("hello", "moto"));
            }

            Assert.IsTrue(engine.allRequirementsSatisfied());

        }
    }
}
