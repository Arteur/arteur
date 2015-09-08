var Redis = require('./redis.js')(process.env.REDIS_URL);

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        config: {
            description: 'return home page',
            handler: function (request, reply) {

                Redis.hgetall('review:1', function (err, review) {

                    return reply.view('home', review);
                });               
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Home'
};
