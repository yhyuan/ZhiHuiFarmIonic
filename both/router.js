Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('profile', {
    path: '/'
  });
  
  this.route('contacts', {
    path: '/contacts'
  });

  this.route('contacts.show', {
    path: '/contacts/:_id'
  });
});
