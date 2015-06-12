Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('profile', {
    path: '/'
  });
  
  this.route('fields', {
    path: '/fields'
  });

  this.route('fields.new', {
    path: '/fields/new'
  });


  this.route('fields.show', {
    path: '/fields/:_id'/*,
    data: function() {
      return Fields.findOne(this.params._id);
    }*/
  });

  this.route('fields.edit', {
    path: '/fields/:_id/edit'/*,
    data: function() {
      return Fields.findOne(this.params._id);
    }*/
  });


});
