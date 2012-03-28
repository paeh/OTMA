jQuery.removeIndexFromArray = function(index, arr) {
    return jQuery.grep(arr, function(elem, arrayIndex) {
        return arrayIndex !== index;
    });
};
