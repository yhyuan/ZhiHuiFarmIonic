AutoForm.hooks({
  'fields-new-form': {
    onSuccess: function (operation, result, template) {
      IonModal.close();
      Router.go('fields.show', {_id: result});
    },

    onError: function(operation, error, template) {
      alert(error);
    }
  }
});
