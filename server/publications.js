/*
Meteor.publish('fields', function() {
  return Fields.find();
});
*/
Meteor.publish('field', function(_id) {
  return Fields.find({_id: _id});
});

Meteor.publish("fields", function () {
  return Fields.find({ owner: this.userId });	
	/*
  return Tasks.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  });*/
});