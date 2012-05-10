using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OTMA.game;

namespace OtmaTest
{
    [TestClass]
    public class BoardTest
    {
        [TestMethod]
        public void TestRoomAndDoorAmount()
        {
            var board = new Board();
            Assert.AreEqual(board.getAllAvailableRooms().Count, 15);
            Assert.AreEqual(board.getAllAvailableDoors().Count, 14);
        }

        [TestMethod]
        public void TestMapping()
        {
            var board = new Board();
            var position1 = board.getBoardElementForCoordinates(new OTMA.domain.Coordinate(3, 3));
            var position2 = board.getBoardElementForCoordinates(new OTMA.domain.Coordinate(2, 3));
            Assert.AreEqual(position2, position1.directions[OTMA.domain.Direction.North]);
        }
    }
}
