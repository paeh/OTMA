$(document).ready(function() {
    OTMA = {};
    loadXML("otma-config.xml", function() {
        loadBoard();
        loadNavigationFunctions();
        initialiseEngine();
        initialiseView();
    });

});