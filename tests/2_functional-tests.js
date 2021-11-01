const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  test('valid input GET req to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=10L')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(JSON.parse(res.text).initNum, 10);
        assert.equal(JSON.parse(res.text).initUnit, 'L');
        assert.equal(JSON.parse(res.text).returnNum, 2.64172);
        assert.equal(JSON.parse(res.text).returnUnit, 'gal');
        assert.equal(JSON.parse(res.text).string, '10 liters converts to 2.64172 gallons');
        done();
      });
  });

  test('invalid input GET req to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=32g')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(JSON.parse(res.text), 'invalid unit');
        done();
      });
  });

  test('invalid number GET req to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(JSON.parse(res.text), 'invalid number');
        done();
      });
  });

  test('invalid number and unit GET req to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kilog')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(JSON.parse(res.text), 'invalid number and unit');
        done();
      });
  });

  test('no number GET req to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert?input=kg')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(JSON.parse(res.text).initNum, 1);
        assert.equal(JSON.parse(res.text).initUnit, 'kg');
        assert.equal(JSON.parse(res.text).returnNum, 2.20462);
        assert.equal(JSON.parse(res.text).returnUnit, 'lbs');
        assert.equal(JSON.parse(res.text).string, '1 kilograms converts to 2.20462 pounds');
        done();
      });
  });   

});
