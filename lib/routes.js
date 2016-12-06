if (Meteor.isClient) {
    Accounts.onLogin(function () {
        FlowRouter.go('newtree');
    });

    Accounts.onLogout(function () {
        FlowRouter.go('home');
    });
}

FlowRouter.triggers.enter([function (context, redirect) {
    if (!Meteor.userId()) {
        FlowRouter.go('home');
    }
}]);

FlowRouter.route('/', {
    name: 'home',
    action(){
        if (Meteor.userId()) {
            FlowRouter.go('newtree');
        }
        BlazeLayout.render('HomeLayout');
    }
});

FlowRouter.route('/trees', {
    name: 'trees',
    action(){
        BlazeLayout.render('MainLayout', {main: 'Trees'});
    }
});


FlowRouter.route('/NewTree', {
    name: 'newtree',
    action(){
        BlazeLayout.render('MainLayout', {main: 'NewTree'});
    }
});