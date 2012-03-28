$(document).ready(function() {

    loadXML("otma-config.xml", function() {
        initialiseBoard();
        initialiseNPC();
        loadNavigationFunctions();
        initialiseEngine();
        initialiseView();
    });

});