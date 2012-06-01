/*
 * Software Systeme lecture SS2012 - "OTMA GAME"
 *
 *                  Copyright (C) 2012
 * Matthias Klass, Johannes Leimer, Rico Lieback, Florian Wiedenmann
 */

describe("OTMA.NPCService", function() {
    var npcService;
    beforeEach(function() {
        npcService = OTMA.NPCService.INSTANCE;
    });

    it("should be possible to get the next sequential avatar picture", function() {
        npcService.reset();
        npcService.availableAvatarImages = ['1', '2'];

        expect(npcService.getNextAvatarPicture()).toBe('1');
        expect(npcService.getNextAvatarPicture()).toBe('2');
        expect(npcService.getNextAvatarPicture()).toBe('1');
    });

    it("should be possible to determine whether a coordinate is occupied by some NPC", function() {
        var npc1 = {
            coordinate: '1x1'
        };
        var npc2 = {
            coordinate: '1x2'
        };
        npcService.people = [npc1, npc2];

        expect(npcService.getNPCForCoordinate('1x1')).toBe(npc1);
        expect(npcService.getNPCForCoordinate('1x2')).toBe(npc2);
        expect(npcService.getNPCForCoordinate('1x3')).toBe(undefined);
    });

    it("NPC should move only be moved if in a distinct interval", function() {
        // in a test, we may reassign the constant
        OTMA.Constants.NPC_ROUND_SPEED = 2;

        var counter = 0;
        npcService.moveNPC = function() { counter += 1 };

        npcService.people = [ 'a' ];

        npcService.moveAllNPCs();
        expect(counter).toBe(0);

        npcService.moveAllNPCs();
        expect(counter).toBe(1);
    })
});