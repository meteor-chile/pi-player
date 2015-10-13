Template.header.events({
  'click .sign-up': function(e) {
    e.preventDefault();
    FlowRouter.go("/signup");
  }
});
