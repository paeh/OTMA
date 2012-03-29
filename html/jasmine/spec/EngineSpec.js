describe('OTMA.Engine', function() {
   it("should be possible to get a random hint which is added to the player's found hints",  function() {
       OTMA.util.getRandomInteger = function() { return 1 };
       var hint1 = { text: 'a' };
       var hint2 = { text: 'b' };
       OTMA.Engine.hints = [hint1, hint2 ];

       expect(OTMA.Engine.getRandomRoomHint()).toBe(hint2);
       expect(OTMA.Engine.Player.foundHints.length).toBe(1);
       expect(OTMA.Engine.Player.foundHints).toContain(hint2);
   })
});