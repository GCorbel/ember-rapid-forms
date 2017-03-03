import Ember from 'ember';

const { Mixin, computed, assert, isNone, defineProperty } = Ember;

/*
A mixin that enriches a component that is attached to a model property that has validation
    support.

This mixin binds a property named `errors` to the model's `model.errors.@propertyName` array
 */

export default Mixin.create({
  init: function() {
    this._super(...arguments);
    assert(!isNone(this.get('propertyName')), 'propertyName is required.');
    defineProperty(this, 'errors', computed.alias((`model.errors.${this.get('propertyName')}`)));
  },

  status: computed('errors.length', 'form.isSubmitted', {
    get: function() {
      if (this.get('errors.length')) {
        if (this.get('form.showErrorsOnRender')) {
          this.set('canShowErrors', true);
        }
        if (this.get('form.showErrorsOnSubmit') && this.get('form.isSubmitted')) {
          this.set('canShowErrors', true);
        }
        return 'error';
      } else {
        return 'success';
      }
    }
  })
});
