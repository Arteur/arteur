module.exports = function (iconName) {

    var result = '';
    if (iconName === 'photo') {
        result = "<span aria-hidden='true' class='glyphicon glyphicon-camera'></span>";
    }
    if (iconName === 'music') {
        result = "<span aria-hidden='true' class='glyphicon glyphicon-headphones'></span>";
    }
    if (iconName === 'painting') {
        result = "<span aria-hidden='true' class='glyphicon glyphicon-picture'></span>";
    }

    return result;

};