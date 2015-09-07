exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        config: {
            description: 'return home page',
            handler: function (request, reply) {

                return reply('This is a home page');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Home'
};
