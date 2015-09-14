module.exports = function(pictures) {
    var result = '';
    for(var i = 0; i < pictures.length; i++) {

        if (i === 0 ) {

            result = result +  "<div class='item active'><img src='" + pictures[i] + "'></div>";
        }else {
            result = result + "<div class='item'><img src='" + pictures[i] + "'></div>";
        }
    }

    return result;
};
