var Redis = require('./redis.js')(process.env.REDIS_URL);
var fs = require('fs');

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
                    var pictures = JSON.stringify([request.payload.fileName]);
                    request.payload.pictures = pictures;
                    request.payload.extraReviews = JSON.stringify([]);

                    Redis.get('idReview', function (err, idReview) {

                        if (err) {
                            return next(err);
                        }

                        request.payload.id = idReview;
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
