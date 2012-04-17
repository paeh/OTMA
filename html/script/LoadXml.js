/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

OTMA.xmlContent = {
    people: [],
    events: [],
    hints: [],

    reset: function() {
        OTMA.xmlContent.people = [];
        OTMA.xmlContent.events = [];
        OTMA.xmlContent.hints = [];
    },
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

function loadXML(filename, callback) {
    var baseUrl = document.URL.replace("index.html", "");
    $(document).load(baseUrl + filename, function(result) {
        OTMA.xmlContent.parseXMLFile(result, callback);
    });
}