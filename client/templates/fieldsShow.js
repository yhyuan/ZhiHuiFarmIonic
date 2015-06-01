Template.fieldsShow.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('field', Router.current().params._id);
  }.bind(this));
};

Template.fieldsShow.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.fieldsShow.helpers({
  field: function () {
    return Fields.findOne({_id: Router.current().params._id});
  },

  activeLabel: function () {
    if (this.details.active) {
      return '<i class="ion-checkmark-circled"></i> Active';
    } else {
      return '<i class="ion-minus-circled"></i> Inactive';
    }
  }
});

Template.fieldsShow.events({
  'click [data-action=fake]': function (event, template) {
    event.preventDefault();
    alert('Gotcha!');
  }
});
