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

describe("OTMA.NPCService", function() {
    it("should be possible to get the next sequential avatar picture", function() {
        OTMA.NPCService.reset();
        OTMA.NPCService.availableAvatarImages = ['1', '2'];

        expect(OTMA.NPCService.getNextAvatarPicture()).toBe('1');
        expect(OTMA.NPCService.getNextAvatarPicture()).toBe('2');
        expect(OTMA.NPCService.getNextAvatarPicture()).toBe('1');
    });

    it("should be possible to determine whether a coordinate is occupied by some NPC", function() {
        var npc1 = {
            coordinate: '1x1'
        };
        var npc2 = {
            coordinate: '1x2'
        };
        OTMA.NPCService.people = [npc1, npc2];

        expect(OTMA.NPCService.getNPCForCoordinate('1x1')).toBe(npc1);
        expect(OTMA.NPCService.getNPCForCoordinate('1x2')).toBe(npc2);
        expect(OTMA.NPCService.getNPCForCoordinate('1x3')).toBe(undefined);
    });

    it("NPC should move only be moved if in a distinct interval", function() {
        OTMA.Constants.NPC_ROUND_SPEED = 2;

        var counter = 0;
        OTMA.NPCService.moveNPC = function() { counter += 1 };

        OTMA.NPCService.people = [ 'a' ];

        OTMA.NPCService.moveAllNPCs();
        expect(counter).toBe(0);

        OTMA.NPCService.moveAllNPCs();
        expect(counter).toBe(1);
    })
});