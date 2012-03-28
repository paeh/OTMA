OTMA.xmlContent = {
    people: [],
    events: [],
    hints: []
};

function loadXML(filename, callback) {
    var baseUrl = document.URL.replace("index.html", "");
    $(document).load(baseUrl + filename, function(result) {
        parseXMLFile(result);
    });

    var parseXMLFile = function(fileContent) {
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

        callback();
    }
}