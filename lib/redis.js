var Redis = require('redis');
var Url = require('url');

var redisClient = function (url) {

    var redisUrl = Url.parse(url);
    var client = Redis.createClient(redisUrl.port, redisUrl.hostname);

    if (redisUrl.auth) {
        client.auth(redisUrl.auth.split(':')[1]);
    }
    return client;
};

module.exports = redisClient;
