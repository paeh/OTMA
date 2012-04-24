/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

/**
 * JavaScript object implementing all functionality to read the otma-config.xml file.
 */
OTMA.xmlContent = {
    people: [],
    events: [],
    hints: [],

    /**
     * Reset all contained data.
     */
    reset: function() {
        OTMA.xmlContent.people = [];
        OTMA.xmlContent.events = [];
        OTMA.xmlContent.hints = [];
    },

    /**
     * Parse a given xml file content.
     * @param fileContent xml content
     * @param callback method pointer called when xml parsing is done.
     */
    parseXMLFile: function(fileContent, callback) {
        OTMA.xmlContent.reset();

        var persons = $(fileContent).find('person');
        $.each(persons, function(index, personXML) {
            var introduction = $(personXML).find('introduction').text();
            var name = $(personXML).attr('name');
            var title = $(personXML).attr('title');

            OTMA.xmlContent.people.push({
                name: name,
                title: title,
                introduction: introduction
            })
        });

        var conferences = $(fileContent).find("conference");
        var workshops = $(fileContent).find("workshop");
        var events = $.merge(conferences, workshops);
        $.each(events, function(index, eventXML) {
            var title = $(eventXML).attr('title');
            var abbreviation = $(eventXML).attr('abrv');
            var description = $(eventXML).find('description').text();

            OTMA.xmlContent.events.push({
                title: title,
                abbreviation: abbreviation,
                description: description
            })
        });

        var hints = $(fileContent).find("hint");
        $.each(hints, function(index, hintXML) {
            var text = $(hintXML).text();
            var title = $(hintXML).attr('title');

            OTMA.xmlContent.hints.push({
                text: text,
                title: title
            })
        });

        if (callback) callback();
    }
};

/**
 * Load an xml file with a given filename from the current URL. Another URL is currently not possible because of the
 * Same Origin Policy (http://de.wikipedia.org/wiki/Same-Origin-Policy)
 * @param filename filename to load
 * @param callback method pointer called when the xml has been parsed and loaded.
 */
function loadXML(filename, callback) {
    var baseUrl = document.URL.replace("index.html", "");
    $(document).load(baseUrl + filename, function(result) {
        OTMA.xmlContent.parseXMLFile(result, callback);
    });
}