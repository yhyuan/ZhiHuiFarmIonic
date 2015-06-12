Meteor.methods({
  addField: function (options) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    return Fields.insert({
      name: options.name,
      geometry: options.geometry,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteField: function (fieldId) {
    Fields.remove(fieldId);
  },
  setChecked: function (taskId, setChecked) {
    Fields.update(taskId, { $set: { checked: setChecked} });
  }
});