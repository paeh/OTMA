/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

describe("OTMA.domain.BoardElement", function() {
    it("should be able to return all the available board directions from a given board element", function() {
        var element = new OTMA.domain.BoardElement("1x1.png", "1x1");
        element.west = new OTMA.domain.BoardElement("1x1.png", "1x2");
        element.north = new OTMA.domain.BoardElement("1x1.png", "1x3");

        var directionElements = element.getAvailableNavigationDirections();

        expect(directionElements.length).toBe(2);
        expect(directionElements).toContain(element.west);
        expect(directionElements).toContain(element.north);
    });
});

describe("OTMA.domain.Room", function() {
    it("should be possible to get a random hint",  function() {
        OTMA.util.getRandomInteger = function() { return 1 };
        var hint1 = { text: 'a' };
        var hint2 = { text: 'b' };

        var room = new OTMA.domain.Room('title', 'abbrev', 'desc', [ hint1, hint2], ['bla', 'blub']);
        OTMA.GameEngine.hints = [hint1, hint2 ];

        expect(room.getRandomContent()).toBe(hint2);
    });
});