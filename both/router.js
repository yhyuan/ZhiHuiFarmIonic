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

  this.route('fields.show', {
    path: '/fields/:_id'
  });
});
