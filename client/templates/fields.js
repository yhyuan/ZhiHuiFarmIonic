Template.fields.created = function () {
  /*
  this.autorun(function () {
    this.subscription = Meteor.subscribe('fields');
  }.bind(this));*/
};

Template.fields.rendered = function () {
  /*
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));*/
};

Template.fields.helpers({
  fields: function () {
    return Fields.find();
  }
});
