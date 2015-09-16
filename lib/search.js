var Redis = require('./redis.js')(process.env.REDIS_URL);

exports.register = function (server, options, next) {

    server.route({
        method: 'POST',
        path: '/search',
        config: {
            description: 'search for reviews',
            handler: function (request, reply) {

                var reviews = [];
                Redis.keys('*', function (err, keys) {

                    if (err) {
                        return next(err);
                    }

                    if (keys.length > 1) {
                        keys.forEach(function (key) {
                            if(key !== 'idReview') {

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
                                review.extraReviews = JSON.parse(review.extraReviews);
                                reviews.push(review);
                                //get all the elements?
                                if (reviews.length === keys.length - 1) {
                                    var reviewsSearch = reviews.filter(function (reviewObj) {

                                        var txt = reviewObj.artistName + ' ' + reviewObj.artName + ' ' + reviewObj.galleryName + ' ' + reviewObj.locationTxt;
                                        return txt.toLowerCase().indexOf(request.payload.txtSearched.toLowerCase()) != -1;
                                    });

                                    if(Number(request.payload.filterStar) !== 0) {
                                        reviewsSearch = reviewsSearch.filter(function (reviewObj) {

                                            return Number(request.payload.filterStar) === Number(reviewObj.stars);
                                        });
                                    }

                                    return reply.view('home', { reviews: reviewsSearch });
                                }
                            });
                          }
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
    name: 'search'
};
