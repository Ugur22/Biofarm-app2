Template.Worlds.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.subscribe('worlds');
    });
});



