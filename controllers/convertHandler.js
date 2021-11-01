function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let num = input.match(/[a-z]/i)
      ? input.slice(0, input.match(/[a-z]/i).index) 
      : input;
    let numRegex = /^\d*\.?\d*\/?\d*\.?\d*$/;
    if (num == '') {
      return 1;
    } else if (!num.match(numRegex)) {
      //console.log(new Error('invalid number'));
      return null;
    } else {
      let reg1 = /^\d*\.?\d*/;
      let reg2 = /\/\d*\.?\d*$/;
      let rad = num.match(reg1) 
        ? parseFloat(num.match(reg1)[0]) 
        : input.match(reg2) ? 0 : 1;
      let div = num.match(reg2) 
        ? parseFloat(num.match(reg2)[0].slice(1)) 
        : 1;
      result = rad / div;
      return result;
    }
  };
  
  this.getUnit = function(input) {
    let result;
    let unitRegex = /[a-z]+$/i;
    result = input.match(unitRegex) 
      ? input.match(unitRegex)[0].toLowerCase() 
      : null;
    if (result != 'l' && result != 'gal' && result != 'km' && result != 'mi' && result != 'lbs' && result != 'kg') {
      //console.log(new Error('invalid unit'));    
      return null;
    }
    if (result == 'l') result = result.toUpperCase();
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      default:
        result = 'N/A';
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result = 'N/A';
    } 
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = 'N/A';
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    let init = this.spellOutUnit(initUnit);
    let ret = this.spellOutUnit(returnUnit);
    result = `${initNum} ${init} converts to ${returnNum} ${ret}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
