var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/', function () {

    it('returns the front page', function (done) {

        Server.init(0, function (err, server) {

            expect(err).to.not.exist();

            server.inject('/', function (res) {

                expect(res.statusCode).to.equal(200);
                server.stop(done);
            });
        });
    });
});
