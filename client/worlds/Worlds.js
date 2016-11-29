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




