module.exports = function (free) {
    var result = 'Free';
    if (!free) {
        result = '£';
    }

    return result;
};
