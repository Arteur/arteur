module.exports = function (permanent, endDate) {

    var result = 'Permanent';
    if (!permanent) {
        result = 'End:' + endDate;
    }

    return result;
};
