Template.fieldsShow.created = function () {

};

Template.fieldsShow.rendered = function () {
  
};

Template.fieldsShow.helpers({
  field: function () {
    return Fields.findOne({_id: Router.current().params._id});
  },
  getPost: function () {
    return {_id: Router.current().params._id};
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
