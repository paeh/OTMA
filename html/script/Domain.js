/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

OTMA.domain = {};

/**
 * Represents an element on the board.
 * @param {String} image name of the image to use for the board element
 * @param {String} coordinate of the board element. Should look like '3x1'
 * @class
 */
OTMA.domain.BoardElement = function(image, coordinate) {
    this.image = image;
    this.coordinate = coordinate;
    this.type = 'MAP';

    this.setNavigationBorders = function(north, east, south, west) {
        this.north = north;
        this.east = east;
        this.south = south;
        this.west = west;
    };

    this.getAvailableNavigationDirections = function() {
        var directions = [];
        if (this.south) directions.push(this.south);
        if (this.north) directions.push(this.north);
        if (this.east) directions.push(this.east);
        if (this.west) directions.push(this.west);

        return directions;
    }
};

/**
 * Represents a door on the board.
 * @param {OTMA.domain.BoardElement} boardElement associated element on the board
 * @param {String} direction direction of the door on the board element.
 * @class
 * @augments OTMA.domain.BoardElement
 */
OTMA.domain.Door = function(boardElement, direction) {
    this.direction = direction;
    if (! boardElement) {
        console.log(boardElement);
    }
    this.coordinate = boardElement.coordinate;
    this.boardElement = boardElement;
    this.type = 'DOOR';

    this.setRoom = function(room) {
        this.room = room;
    }
};
OTMA.domain.Door.prototype = new OTMA.domain.BoardElement(undefined, undefined);

/**
 * Superclass for Human and NPC Players
 * @class.
 */
OTMA.domain.Player = function() {};

/**
 * Represents a human player.
 * @param {String} coordinate coordinate of the player. Looks like '1x1'
 * @class
 * @augments OTMA.domain.Player
 */
OTMA.domain.HumanPlayer = function(coordinate) {
    this.coordinate = coordinate;
    this.foundHints = [];
    this.foundNPC = [];

    this.addFoundHint = function(hint) {
        OTMA.util.addToArrayIfNotContained(this.foundHints, hint);
    };

    this.addFoundNPC = function(npc) {
        OTMA.util.addToArrayIfNotContained(this.foundNPC, npc);
    }
};
OTMA.domain.HumanPlayer.prototype = new OTMA.domain.Player();

/**
 * Represents an NPC Player.
 * @param {String} name name of the NPC player.
 * @param {String} title title of the NPC player.
 * @param {String} introduction introduction text of the NPC player.
 * @class
 * @augments OTMA.domain.Player
 */
OTMA.domain.NPCPlayer = function(name, title, introduction) {
    this.name = name;
    this.introduction = introduction;
    this.title = title;

    this.coordinate = undefined;
    this.picture = undefined;
};
OTMA.domain.NPCPlayer.prototype = new OTMA.domain.Player();

/**
 * Base class for both hints and stories that can be found within a room.
 * @class
 */
OTMA.domain.RoomStory = function() {};

/**
 * Represents a hint within the game.
 * @param {String} title title text
 * @param {String} text content
 * @class
 * @augments OTMA.domain.RoomStory
 */
OTMA.domain.Hint = function(title, text) {
    this.title = title;
    this.text = text;
    this.type = 'HINT';
};
OTMA.domain.Hint.prototype = new OTMA.domain.RoomStory();

/**
 * Represents a story within the game.
 * @param {String} title title text
 * @param {String} text content
 * @class
 * @augments OTMA.domain.RoomStory
 */
OTMA.domain.Story = function(title, text) {
    this.title = title;
    this.text = text;
    this.type = 'STORY';
};
OTMA.domain.Story.prototype = new OTMA.domain.RoomStory();

/**
 * Represents a room.
 * @param {String} title room title
 * @param {String} abbreviation room abbreviation
 * @param {String} description room description
 * @param {OTMA.domain.Hint[]} hints room hints
 * @param {OTMA.domain.Story[]} storyItems room story items
 * @class
 */
OTMA.domain.Room = function(title, abbreviation, description, hints, storyItems) {
    this.title = title;
    this.abbreviation = abbreviation;
    this.description = description;
    this.hints = hints;
    this.storyItems= storyItems;

    this.door = undefined;

    var that = this;

    /**
     * Get some random room content. This is either a room hint or story.
     * @return {OTMA.domain.RoomStory} random hint or story
     */
    this.getRandomContent = function() {
        var rand = OTMA.util.getRandomInteger(4);
        if (rand == 1) {
            return getRandomHint();
        } else {
            return getRandomStoryItem();
        }
    };

    /**
     * Get some random story.
     * @return {OTMA.domain.Story} story
     */
    var getRandomStoryItem = function() {
        var randomHintNumber = OTMA.util.getRandomInteger(that.storyItems.length);

        return that.storyItems[randomHintNumber];
    };

    /**
     * Get some random hint.
     * @return {OTMA.domain.Hint} hint
     */
    var getRandomHint = function() {
        var randomHintNumber = OTMA.util.getRandomInteger(that.hints.length);

        var hint = that.hints[randomHintNumber];
        $(document).trigger('hintFound', hint);

        return hint;
    };
};
