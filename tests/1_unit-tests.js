const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  suite('correctly read numeric input', function(done) {

    test('whole number input', function(done) {
      assert.equal(convertHandler.getNum('11km'), 11);
      done();
    });

    test('decimal number input', function(done) {
      assert.equal(convertHandler.getNum('20.5gal'), 20.5);
      done()
    });

    test('fractional number input', function(done) {
      assert.approximately(convertHandler.getNum('20/2gal'), 10, 0.01);
      done();
    });

    test('fractional and decimal input', function(done) {
      assert.approximately(convertHandler.getNum('20.5/2gal'), 10.25, 0.01);
      done();
    });

    test('invalid fractional input', function(done) {
      assert.equal(convertHandler.getNum('2/3/3gal'), null);
      done();
    });

    test('no numerical input returns 1', function(done) {
      assert.equal(convertHandler.getNum('gal'), 1);
      done();
    });

  });

  suite('correctly read unit input', function() {

    test('read valid unit input', function(done) {
      const input = ['gal', 'l', 'km', 'mi', 'lbs', 'kg', 'GAL', 'L', 'KM', 'MI', 'LBS', 'KG'];
      input.forEach(elem => {
        if (elem == 'l' || elem == 'L') {
          assert.equal(convertHandler.getUnit(elem), 'L');
        } else {
          assert.equal(convertHandler.getUnit(elem), elem.toLowerCase());
        }
      });
      done();
    });

    test('invalid unit input', function(done) {
      assert.equal(convertHandler.getUnit('20gals'), null);
      done();
    });

  });

  suite('correctly return and spell unit', function() {

    test('correctly return unit', function(done) {
      let input = ['gal', 'L', 'km', 'mi', 'lbs', 'kg'];
      let output = ['L', 'gal', 'mi', 'km', 'kg', 'lbs'];
      input.forEach((elem, index) => {
        assert.equal(convertHandler.getReturnUnit(elem), output[index]);
      });
      done();
    });

    test('correctly spell unit names', function(done) {
      let input = ['gal', 'L', 'km', 'mi', 'lbs', 'kg'];
      let output = ['gallons', 'liters', 'kilometers', 'miles', 'pounds', 'kilograms'];
      input.forEach((elem, index) => {
        assert.equal(convertHandler.spellOutUnit(elem), output[index]);
      });
      done();
    });

  });

  suite('correctly convert elements', function() {

    test('correctly convert gal to L', function(done) {
      assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.01);
      done();
    });

    test('correctly convert L to gal', function(done) {
      assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.01);
      done();
    });
    
    test('correctly convert mi to km', function(done) {
      assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.01);
      done();
    });

    test('correctly convert km to mi', function(done) {
      assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.01);
      done();
    });  
 
    test('correctly convert lbs to kg', function(done) {
      assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.01);
      done();
    });

    test('correctly convert kg to lbs', function(done) {
     assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.01);
      done();
    });   
     
  });

});
