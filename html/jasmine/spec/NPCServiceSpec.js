describe("OTMA.NPC", function() {
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
    })
});