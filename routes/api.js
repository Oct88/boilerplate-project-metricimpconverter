'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(
    (req, res, next) => {
    console.log('input required: ', req.query.input);
    let num = convertHandler.getNum(req.query.input);
    let unit = convertHandler.getUnit(req.query.input);
    console.log(`Num is ${num} and unit is ${unit}.`);
    next();
  }, 
  (req, res) => {
    let num = Number(convertHandler.getNum(req.query.input));
    let unit = convertHandler.getUnit(req.query.input);
     if (num && unit) {
      let retNum = Number(convertHandler.convert(num, unit));
      let retUnit = convertHandler.getReturnUnit(unit);
      let str = convertHandler.getString(num, unit, retNum, retUnit);
      //console.log(typeof str, str);
      res.json({
        initNum: num,
        initUnit: unit,
        returnNum: retNum,
        returnUnit: retUnit,
        string: str
      });
    } else if (!num && !unit) {
      res.json("invalid number and unit");
    } else if (!num) {
      res.json('invalid number');
    } else {
      res.json('invalid unit');
    }

  });

};
