'use strict';

import validators from './validators';

class FormField {
  constructor( field ) {
    this.field = field;
    this.required = this.field.required;
    this.errorList = [];
  }

  /**
   * Determine if input is valid or not, save errors to
   * @return {bool} true if field is valid - false if invalid
   */
  validate() {
    this.resetErrors();
    let isValid = true;

    let type =  this.field.tagName.toLowerCase();
    if ( type === 'input' || type === 'textarea' ) {
      type = this.field.getAttribute('type').toLowerCase();
    }

    if ( this.required ) {
      switch ( type ) {
        case 'text':
          this.checkEmptyString();
          this.checkTooShort();
          this.checkTooLong();

          break;

        case 'email':
          this.checkEmptyString();
          this.checkEmail();
          break;

        case 'checkbox':
          if ( !validators.checkbox(this.field) ) {
            this.addError('Not checked')
          }
          break;

        case 'radio':
          // get value from other radios with same name
          // is value
          break;

        case 'zip':
          this.checkEmptyString();
          this.checkIsNumber();
          this.checkTooShort();
          this.checkTooLong();
          break;

        case 'number':
          this.checkIsNumber();
          this.checkNumberInRange();
          break;

        case 'phone':
          // TODO:
          break;

        case 'age':
          this.checkAge();
          break;

        case 'select':
          this.checkEmptyString();
          break;
      }

      if ( this.field.getAttribute('data-match') && !validate.match(this.field) ) {
        isValid = false;
      }

    }

    isValid = this.errors.length === 0;

    return isValid;
  }

  get name() {
    return this.field.getAttribute('name');
  }

  // input checks
  checkEmptyString() {
    if ( this.field.value === '' ) {
      this.addError('is empty');
    }
  }

  checkIsNumber() {
    if ( !validators.number(parseInt(this.field.value)) ) {
      this.addError('is not a number');
    }
  }

  checkNumberInRange() {
    if ( !validators.inRange(this.field.value, this.min, this.max) ) {

    }
  }

  checkTooLong() {
    if ( validators.isLong(this.field.value, this.maxlength !== -1 ? this.maxlength : 255) ) {
      this.addError('is too long');
    }
  }

  checkTooShort() {
    if ( validators.isShort(this.field.value, this.minlength) ) {
      this.addError('is too short');
    }
  }

  checkEmail() {
    if ( !validators.email(this.field.value) ) {
      this.addError('Is not a valid email');
    }
  }

  checkAge() {
    if ( validators.age( this.field.value, this.min ) ) {
      this.addError('does not meet age requirements');
    }
  }



  ////////////
  // errors //
  ////////////
  resetErrors() {
    this.errorList = [];
  }

  /**
   * [addError description]
   */
  addError( message ) {
    this.errors = this.name + ': ' + message;
  }

  /**
   * Get a list of errors
   * @return {array} list of errors
   */
  get errors() {
    return this.errorList;
  }

  /**
   * Set an error
   * @param  {string} error Error string
   */
  set errors( error ) {
    this.errorList.push(error);
  }

  ///////////////////////
  // attribute getters //
  ///////////////////////
  get minlength() {
    return this.field.getAttribute('minlength') ? this.field.getAttribute('minlength') : 0;
  }

  get maxlength() {
    return this.field.getAttribute('maxlength') ? this.field.getAttribute('maxlength') : -1;
  }

  get min() {
    return this.field.getAttribute('min') ? this.field.getAttribute('min') : 0;
  }

  get max() {
    return this.field.getAttribute('max') ? this.field.getAttribute('max') : 1000000;
  }
}

module.exports = exports = FormField;
