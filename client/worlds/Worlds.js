Template.Worlds.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.subscribe('worlds');
    });
});


Template.Worlds.helpers({
    worlds: ()=> {
        return Worlds.find({});
    }
});


Template.Worlds.events({

    'click .update'(event) {
        event.preventDefault();

        const C02 = 0;
        const Air = 0;

        Worlds.insert({
            C02,
            Air
        });
    },
});




