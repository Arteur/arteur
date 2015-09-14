var Redis = require('./redis.js')(process.env.REDIS_URL);
exports.register = function (server, options, next) {

    server.route([
    {
        method: 'GET',
        path: '/addExtraPicture/{id}',
        config: {
            description: 'return add extra picture page',
            handler: function (request, reply) {

               return reply.view('extraPicture', {idReview: request.params.id});
            }
        }
    },

    {
        method: 'POST',
        path: '/addExtraPicture/{idReview}',
        config: {
            description: 'create extra review',
            handler: function (request, reply) {

                Redis.hget('review:' + request.params.idReview, 'pictures', function (err, pictures) {

                    var picturesObject = JSON.parse(pictures);
                
                    picturesObject.push(request.payload.fileNameExtra);

                    Redis.hset('review:' + request.params.idReview, 'pictures', JSON.stringify(picturesObject));

                    return reply.redirect('/review/' + request.params.idReview);
                });

            }
        }
    }

    ]);

    return next();
};

exports.register.attributes = {
    name: 'addExtraPicture'
};
