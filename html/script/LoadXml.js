/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

/**
 * JavaScript object implementing all functionality to read the otma-config.xml file.
 * @class
 */
OTMA.XML = {
    people: [],
    rooms: [],

    /**
     * Reset all contained data.
     */
    reset: function() {
        OTMA.XML.people = [];
        OTMA.XML.rooms = [];
        OTMA.XML.hints = [];
    },

    /**
     * Parse a given xml file content.
     * @param {String} fileContent xml content
     * @param {Function} callback method pointer called when xml parsing is done.
     */
    parseXMLFile: function(fileContent, callback) {
        OTMA.XML.reset();

        var persons = $(fileContent).find('person');
        $.each(persons, function(index, personXML) {
            var introduction = $(personXML).find('introduction').text();
            var name = $(personXML).attr('name');
            var title = $(personXML).attr('title');

            OTMA.XML.people.push(new OTMA.domain.NPCPlayer(name, title, introduction));
        });

        var hints = $(fileContent).find("hint");
        $.each(hints, function(index, hintXML) {
            var text = $(hintXML).text();
            var title = $(hintXML).attr('title');

            var hint = new OTMA.domain.Hint(title, text);
            OTMA.XML.hints.push(hint);
        });

        var conferences = $(fileContent).find("conference");
        var workshops = $(fileContent).find("workshop");
        var events = $.merge(conferences, workshops);
        $.each(events, function(index, eventXML) {
            var title = $(eventXML).attr('title');
            var abbreviation = $(eventXML).attr('abrv');
            var description = $(eventXML).find('description').text();

            OTMA.XML.rooms.push(
                new OTMA.domain.Room(title, abbreviation, description, OTMA.XML.hints, OTMA.Constants.STORY_ITEMS)
            );
        });



        if (callback) callback();
    }
};

/**
 * Load an xml file with a given filename from the current URL. Another URL is currently not possible because of the
 * Same Origin Policy (http://de.wikipedia.org/wiki/Same-Origin-Policy)
 * @param {String} filename filename to load
 * @param {Function} callback method pointer called when the xml has been parsed and loaded.
 */
function loadXML(filename, callback) {
    var baseUrl = document.URL.replace("index.html", "");
    $(document).load(baseUrl + filename, function(result) {
        OTMA.XML.parseXMLFile(result, callback);
    });
}