Template._fieldsEdit.helpers({
  field: function () {
    var template = Template.instance();
    return Fields.findOne({_id: template.data.id});
  }
});

AutoForm.hooks({
  'fields-edit-form': {
    onSuccess: function (operation, result, template) {
      IonModal.close();
    },

    onError: function(operation, error, template) {
      alert(error);
    }
  }
});
