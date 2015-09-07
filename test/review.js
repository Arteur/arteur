var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/review', function () {

    it('returns the review page', function (done) {

        Server.init(0, function (err, server) {
            console.log(err);
            expect(err).to.not.exist();

            server.inject('/review', function (res) {

                expect(res.statusCode).to.equal(200);
                server.stop(done);
            });
        });
    });
});
