'use strict';
import moment from 'moment';

const validators = {
  age( value, min = 18 ) {
    let age = moment(value);
    let valid = age.isValid();

    if ( valid ) {
      let minimum = moment().subtract(min.toString(), 'years');
      valid = minimum.isAfter(age);
    }

    return valid;
  },


  number( value ) {
    return typeof value === 'number';
  },


  inRange( value, min = 0, max = 1000 ) {
    return value < min || value > max;
  },


  email( value ) {
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test( value );
  },


  zip( value ) {
    let isValid = true;
    value = typeof value !== 'number' ? parseInt(value) : value;

    if ( this.number( value ) ) {
      isValid = value.toString().length === 5;
    }
    else {
      isValid = false;
    }

    return isValid;
  },


  fieldMatch( input ) {
    let matchInput = document.querySelectorAll( input.getAttribute('data-match') )[0];
    return input.value === matchInput.value;
  },


  checkbox( input ) {
    return input.checked;
  },


  phone( value, country = 'us' ) {
    // TODO: Validate phone numbers
    return true;
  },


  selectBox( value ) {
    return value !== '';
  },


  isShort( value, min ) {
    return value.split("").length < min;
  },


  isLong( value, max = 255 ) {
    return value.split("").length > max;
  },


  length( value, min = 0, max = -1) {
    let isValid = true;

    if ( this.isShort(value, min) && max === -1 ) {
      isValid = false;
    }
    else if ( this.isShort(value, min) || this.isLong(value, max) ) {
      isValid = false;
    }

    return isValid;
  }


}

module.exports = exports = validators;
