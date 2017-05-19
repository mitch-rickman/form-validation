var assert = require('assert');
import moment from 'moment';
import validators from '../src/modules/validators';

describe('Validators', function() {
  describe('age', function() {
    it('should return false if provided date is invalid', function() {
      assert.equal(false, validators.age('not a date'));
      // assert.equal(false, validators.age('12.2.1990'));
    });

    it('should return false if provided date is below minimum', function() {
      assert.equal(false,  validators.age(moment().subtract('17', 'years')) );
    });

    it('should accept a new minimum date', function() {
      assert.equal(true, validators.age(moment().subtract('45', 'years'), 44));
      assert.equal(false, validators.age(moment().subtract('45', 'years'), 46));
    });

  });
});
