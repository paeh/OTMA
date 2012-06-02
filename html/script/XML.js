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
OTMA.XML = function() {
    this.lastLoad = {};
    this.people = [];
    this.rooms = [];

    var that = this;

    /**
     * Reset all contained data.
     */
    this.reset = function() {
        that.lastLoad = {
            people: [],
            hints: [],
            rooms: []
        };
    };

    /**
     * Load the content from a given URL, parse the file content and create OTMA domain objects.
     * The result can be found in the lastLoad attribute of the current XML instance and is also provided
     * to the callback function.
     * @param {String} filename xml URL
     * @param {Function} callback method pointer called when xml parsing is done.
     */
    this.loadURL = function(filename, callback) {
        var baseUrl = document.URL.replace("index.html", "");
        $(document).load(baseUrl + filename, function(result) {
            OTMA.XML.INSTANCE.parseXMLFileAndCreateDomainObjects(result, callback);
        });
    };

    /**
     * Parse a given xml file content and create OTMA domain objects. The result can be found
     * in the lastLoad attribute of the current XML instance and is also provided to the callback
     * function.
     * @param {String} fileContent xml content
     * @param {Function} callback method pointer called when xml parsing is done.
     */
    this.parseXMLFileAndCreateDomainObjects = function(fileContent, callback) {
        var result = that.parseXMLFile(fileContent);
        that.reset();

        $.each(result.hints, function(index, hint) {
            that.lastLoad.hints.push(
                new OTMA.domain.Hint(hint.title, hint.text)
            );
        });
        $.each(result.persons, function(index, person) {
            that.lastLoad.people.push(
                new OTMA.domain.NPCPlayer(person.name, person.title, person.introduction)
            );
        });
        $.each(result.rooms, function(index, room) {
            that.lastLoad.rooms.push(
                new OTMA.domain.Room(room.title, room.abbreviation, room.description, that.lastLoad.hints,
                    OTMA.Constants.STORY_ITEMS)
            );
        });

        if (callback) callback(that.lastLoad);
    };

    /**
     * Parse a given xml file content.
     * @param {String} fileContent xml content
     * @return {Object} object of read values
     */
    this.parseXMLFile = function(fileContent) {
        var result = {
            rooms: [],
            persons: [],
            hints: []
        };

        var persons = $(fileContent).find('person');
        $.each(persons, function(index, personXML) {
            var introduction = $(personXML).find('introduction').text();
            var name = $(personXML).attr('name');
            var title = $(personXML).attr('title');

            result.persons.push({
                name: name,
                title: title,
                introduction: introduction
            });
        });

        var hints = $(fileContent).find("hint");
        $.each(hints, function(index, hintXML) {
            var text = $(hintXML).text();
            var title = $(hintXML).attr('title');

            result.hints.push({
                title: title,
                text: text
            });
        });

        var conferences = $(fileContent).find("conference");
        var workshops = $(fileContent).find("workshop");
        var events = $.merge(conferences, workshops);
        $.each(events, function(index, eventXML) {
            var title = $(eventXML).attr('title');
            var abbreviation = $(eventXML).attr('abrv');
            var description = $(eventXML).find('description').text();

            result.rooms.push({
                title: title,
                abbreviation: abbreviation,
                description: description
            });
        });

        return result;
    }
};
OTMA.XML.INSTANCE = new OTMA.XML();

/**
 * Load an xml file with a given filename from the current URL. Another URL is currently not possible because of the
 * Same Origin Policy (http://de.wikipedia.org/wiki/Same-Origin-Policy)
 * @param {String} filename filename to load
 * @param {Function} callback method pointer called when the xml has been parsed and loaded.
 */
function loadXML(filename, callback) {
    OTMA.XML.INSTANCE.loadURL(filename, callback);
}