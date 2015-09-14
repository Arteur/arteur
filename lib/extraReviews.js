var Redis = require('./redis.js')(process.env.REDIS_URL);
exports.register = function (server, options, next) {

    server.route([
    {
        method: 'GET',
        path: '/extrareview/{idReview}',
        config: {
            description: 'return extra review page',
            handler: function (request, reply) {

               return reply.view('extraReview', {idReview: request.params.idReview});
            }
        }
    },

    {
        method: 'POST',
        path: '/extrareview/{idReview}',
        config: {
            description: 'create extra review',
            handler: function (request, reply) {

                Redis.hget('review:' + request.params.idReview, 'extraReviews', function (err, extraReviews) {

                    var extraReviewsObject = JSON.parse(extraReviews);
                    request.payload.pictures = [request.payload.fileName];
                    extraReviewsObject.push(request.payload);
                    Redis.hset('review:' + request.params.idReview, 'extraReviews', JSON.stringify(extraReviewsObject));

                    return reply.redirect('/review/' + request.params.idReview);
                });

            }
        }
    }

    ]);

    return next();
};

exports.register.attributes = {
    name: 'extraReview'
};
