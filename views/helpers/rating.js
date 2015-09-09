module.exports = function (num, nameIcon) {

    var result = '';
    for (var i = 0; i < num; i++) {
        result += "<span aria-hidden='true' class='" + nameIcon + "'></span>";
    }
    return result;
};
