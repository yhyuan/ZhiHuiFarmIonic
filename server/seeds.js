Meteor.startup(function () {
  if ( Meteor.users.find().count() === 0 ) {
      Accounts.createUser({
          username: 'yyh',
          email: 'yhyuan@gmail.com',
          password: '1234',
          profile: {
              first_name: 'fname',
              last_name: 'lname',
              company: 'company',
          }
      });
  }
  if (Contacts.find({}).count() === 0) {
    _(20).times(function(n) {
      var user = Fake.user();

      Contacts.insert({
        name: {
          first: user.name,
          last: user.surname
        },
        emails: [{label: 'Work', address: user.email}],
        priority: Fake.fromArray(['High', 'Medium', 'Low']),
        location: {
          city: Fake.word(),
          state: Fake.fromArray(STATES)
        },
        details: {
          notes: Fake.paragraph(),
          active: Fake.fromArray([true, false])
        }
      });
    });
  }

});
