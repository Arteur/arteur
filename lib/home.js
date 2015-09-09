var Redis = require('./redis.js')(process.env.REDIS_URL);

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        config: {
            description: 'return home page',
            handler: function (request, reply) {

                var reviews = [];
                Redis.keys('*', function (err, keys) {

                    if (err) {
                        return next(err);
                    }

                    if (keys.length !== 0) {
                        keys.forEach(function (key) {

                            Redis.hgetall(key, function (err, review) {

                                if (err) {
                                    return next(err);
                                }
                                review.pictures = JSON.parse(review.pictures);
                                review.frontImage = review.pictures[0];
                                review.stars = Number(review.stars);
                                review.hearts = Number(review.hearts);
                                review.icon1 = Number(review.icon1);
                                review.icon2 = Number(review.icon2);
                                
                                reviews.push(review);
                                if (reviews.length === keys.length) {
                                    return reply.view('home', { reviews: reviews });
                                }
                            });
                        });
                    } else {
                        return reply.view('home', { reviews: reviews });
                    }
                });
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Home'
};
