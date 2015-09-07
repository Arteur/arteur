exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/review',
        config: {
            description: 'return review page',
            handler: function (request, reply) {

                return reply.view('review');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Review'
};
