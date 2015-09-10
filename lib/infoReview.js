var Redis = require('./redis.js')(process.env.REDIS_URL);

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/review/{idReview}',
        config: {
            description: 'return home page',
            handler: function (request, reply) {

                Redis.hgetall('review:' + request.params.idReview, function (err, review) {

                    if(err) {
                        return next(err);
                    }
                    review.pictures = JSON.parse(review.pictures);
                    review.extraReviews = JSON.parse(review.extraReviews);
                    return reply.view('infoReview', review);
                });
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'infoReview'
};
