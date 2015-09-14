require('env2')('.env');
var Assets = require('./assets.js');
var ExtraReview = require('./extraReviews.js');
var Handlebars = require('handlebars');
var Hapi = require('hapi');
var Home = require('./home.js');
var Inert = require('inert');
var Map = require('./map.js');
var Picture = require('./picture.js');
var Review = require('./review.js');
var Vision = require('vision');
var InfoReview = require('./infoReview.js');

exports.init = function (port, next) {

    var server = new Hapi.Server();
    server.connection({ port: port });

    server.register([Inert, Vision, Assets, Home, Review, InfoReview, ExtraReview, Picture, Map], function (err) {

        // $lab:coverage:off$
        if (err) {
            return next(err);
        }
        // $lab:coverage:on$

        server.views({
            engines: {
                html: Handlebars
            },
            relativeTo: __dirname + '/../views/',
            path: '.',
            layout: 'default',
            layoutPath: 'layout',
            helpersPath: 'helpers',
            partialsPath: 'partials'
        });

        server.start(function (err) {

            return next(err, server);
        });
    });
};
