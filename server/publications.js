Meteor.publish('fields', function() {
  return Fields.find();
});

Meteor.publish('field', function(_id) {
  return Fields.find({_id: _id});
});
