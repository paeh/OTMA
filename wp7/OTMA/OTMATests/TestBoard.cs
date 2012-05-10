using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OTMA.game;

namespace OTMATests
{
    [TestClass]
    public class TestBoard
    {
        [TestMethod]
        public void BoardTest()
        {
            var board = new Board();
            Assert.AreEqual(board.getAllAvailableBoardElements(), 25);
        }
    }
}
