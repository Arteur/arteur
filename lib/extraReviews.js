var Redis = require('./redis.js');
exports.register = function (server, options, next) {

    server.route([
    {
        method: 'GET',
        path: '/extrareview/{idReview}',
        config: {
            description: 'return extra review page',
            handler: function (request, reply) {
                console.log('fsdfsdfsdfsd');
               return reply.view('extraReview', request.params.idReview);               
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

                    var extraReviews = JSON.parse(extraReviews);
                    var pictures = JSON.stringify(['/assets/pictures/pic1.jpg', '/assets/pictures/pic2.jpg', '/assets/pictures/pic3.jpg', '/assets/pictures/pic4.jpg']);
                    request.payload.pictures = pictures;
                    extraReviews.push(request.payload);

                    Redis.hset('review:' + request.params.idReview, 'extraReviews', JSON.stringify(extraReviews));

                    return reply.redirect('/infoReview/' + request.params.idReview);
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
