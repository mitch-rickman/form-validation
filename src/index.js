'use strict';

import FormField from './form-modules/form-fields';

class Form {
  constructor( form ) {
    this.form = form;
    this.getFields();
  }

  getFields() {
    this.fields = [];

    this.form.querySelectorAll('input, select, textarea').forEach(( input ) => {
      // ignore recaptcha field
      if ( input.className.indexOf('g-recaptcha-response') === -1 ) {
        this.fields.push( new FormField( input ) );
      }
    });
  }

  validate() {
    this.resetErrors();
    let isValid = true;

    this.fields.forEach(( field ) => {
      if ( !field.validate() ) {
        isValid = false;
        this.errorList[field.name] = field.errors;
      }
    });


    return isValid;
  }

  resetErrors() {
    this.errorList = {};
  }

  get errors() {
    return this.errorList;
  }
}

module.exports = exports = Form;
