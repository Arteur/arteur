module.exports = function (num, nameIcon) {

    var result = '';
    for (var i = 0; i < num; i++) {
        result += "<div class=" + nameIcon + " aria-hidden='true'></div>";
    }
    return result;
};
