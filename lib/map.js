exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/map',
        config: {
            description: 'return location page',
            handler: function (request, reply) {

                return reply.view('map');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Map'
};

