module.exports = function(pictures) {
    var result = '';
    pictures.forEach(function (picture) {
        result += "<img src='" + picture + "'alt='gallery picture'>";
    });
    return result;
};