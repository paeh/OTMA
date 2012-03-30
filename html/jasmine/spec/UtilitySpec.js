describe('OTMA.Utility', function() {
    it('is possible to add an item to an array if it is not yet contained', function() {
        var array = [];

        OTMA.util.addToArrayIfNotContained(array, 'a');
        expect(array.length).toBe(1);

        OTMA.util.addToArrayIfNotContained(array, 'a');
        expect(array.length).toBe(1);

        OTMA.util.addToArrayIfNotContained(array, 'b');
        expect(array.length).toBe(2);

        expect(array).toContain('a');
        expect(array).toContain('b');

    });
});