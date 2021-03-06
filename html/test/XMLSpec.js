/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

describe("OTMA.XML", function() {
    var xml;
    beforeEach(function() {
        xml = OTMA.XML.INSTANCE;
        xml.reset();
    });

    it("should load an xml file correctly", function() {
        var xmlContent = '<?xml version="1.0" encoding="utf-8"?><config xmlns="http://www.onthemove-academy.org/schema/config" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.onthemove-academy.org/schema/config otma-config.xsd"><people><person name="huhu" title="dean"><introduction>Hi ich bin der dean</introduction></person><person name="Hans Dampf" title="faculty member"><introduction>text</introduction></person><person name="Florian Mueller" title="organisation chair"><introduction>text</introduction></person></people><events><conference title="Android Con" abrv="Short"><description>text</description></conference><conference title="Games Con" abrv="Short"><description>text</description></conference><workshop title="What ever" abrv="Short"><description>text</description></workshop></events><hints><hint title="Presentation skills"></hint><hint title="huh">text</hint></hints></config>';
        var result = xml.parseXMLFile(xmlContent);

        var people = result.persons;
        expect(people.length).toBe(3);
        expect(people).toContain({
            name: 'huhu',
            title: 'dean',
            introduction: 'Hi ich bin der dean'
        });
        expect(people).toContain({
            name: 'Hans Dampf',
            title: 'faculty member',
            introduction: 'text'
        });
        expect(people).toContain({
            name: 'Florian Mueller',
            title: 'organisation chair',
            introduction: 'text'
        });

        var rooms = result.rooms;
        expect(rooms.length).toBe(3);
        expect(rooms).toContain({
            title: 'Android Con',
            abbreviation: 'Short',
            description: 'text'
        });
        expect(rooms).toContain({
            title: 'Games Con',
            abbreviation: 'Short',
            description: 'text'
        });
        expect(rooms).toContain({
            title: 'What ever',
            abbreviation: 'Short',
            description: 'text'
        });

        var hints = result.hints;
        expect(hints.length).toBe(2);
        expect(hints).toContain({
            title: 'Presentation skills',
            text: ''
        });
        expect(hints).toContain({
            title: 'huh',
            text: 'text'
        });
    });
});
