var Redis = require('./redis.js')(process.env.REDIS_URL);
exports.register = function (server, options, next) {

    server.route([
        {
            method: 'GET',
            path: '/review',
            config: {
                description: 'return review page',
                handler: function (request, reply) {

                    return reply.view('review');
                }
            }
        },

        {
            method: 'POST',
            path: '/review',
            config: {
                description: 'create a review',
                handler: function (request, reply) {

                    var today = new Date();
                    request.payload.date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                    var pictures = JSON.stringify(['/assets/pictures/pic1.jpg', '/assets/pictures/pic2.jpg', '/assets/pictures/pic3.jpg', '/assets/pictures/pic4.jpg']);
                    request.payload.pictures = pictures;
                    request.payload.extraReviews = JSON.stringify([]);
                    // var reviewId = get the last id from redis
                    Redis.get('idReview', function (err, idReview) {

                        if (err) {
                            return next(err);
                        }
                        Redis.hmset('review:' + idReview, request.payload);
                        Redis.set('idReview',Number(idReview) + 1, function (err) {

                            if (err) {
                                return next(err);
                            }
                        });
                        return reply.redirect('/');
                    });
                }
            }
        }

    ]);

    return next();
};

exports.register.attributes = {
    name: 'Review'
};