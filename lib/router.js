if ( Meteor.isClient ) {
  Tracker.autorun( () => {
    if ( !Meteor.userId() && FlowRouter.current().route ) {
      FlowRouter.go( 'login' );
    }
  });
}

var exposed = FlowRouter.group();
exposed.route('/login', {
  name: 'login',
  action: function() {
    BlazeLayout.render("mainLayout", {header: "header", content: "login"});
  }
});


var loggedIn = FlowRouter.group({
  triggersEnter: [
    function() {
      var route;
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        route = FlowRouter.current();
        if (route.route.name !== 'login') {
          Session.set('redirectAfterLogin', route.path);
        }
        return FlowRouter.go("/login");
      }
    }
  ]
});

Accounts.onLogin( function() {
  var currentRoute = FlowRouter.current();
  if ( currentRoute && currentRoute.route.group.name === 'loggedin' ) {
    FlowRouter.go( '/home' );
  }
});

exposed.route('/signup', {
  name: 'signup',
  action: function() {
    BlazeLayout.render("mainLayout", {header: "header", content: "signup"});
  }
});


loggedIn.route('/',{
  name: 'home',
  action: function() {
    BlazeLayout.render("mainLayout",{header: "header", content: "home"})
  }
});

loggedIn.route('/search',{
  name: 'search',
  action: function() {
    BlazeLayout.render("mainLayout",{header: "header", content: "search"})
  }
});

loggedIn.route('/logout',{
  name: 'logout',
  action: function() {
    Meteor.logout(function() {
      FlowRouter.go(FlowRouter.path('login'));
    });
  }
});