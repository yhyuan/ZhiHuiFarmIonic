Template.profile.events({
  'click [data-action=logout]': function () {
    AccountsTemplates.logout();
  }
});

Accounts.onLogin(function() {
	Router.go('/fields');
});