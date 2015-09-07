var Code = require('code');
var Lab = require('lab');
var Hapi = require('hapi');
var Home = require('../lib/home.js');

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var it = lab.test;

var Server = require('../lib/index.js');

it('starts server and return an instance of Hapi server', function (done) {

    Server.init(0, function (err, server) {

        expect(err).to.not.exist();
        expect(server).to.be.instanceof(Hapi.Server);

        server.stop(done);
    });
});

it('handles register plugin errors', { parallel: false }, function (done) {

    Home.register = function (server, options, next) {

        return next(new Error('failed plugin'));
    };

    Home.register.attributes = {

        name: 'fake home plugin'
    };

    Server.init(0, function (err, server) {

        expect(err).to.exist();
        expect(err.message).to.equal('failed plugin');

        done();
    });

});
