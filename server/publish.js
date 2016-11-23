Meteor.publish('trees', function () {
    return Trees.find({owner:this.userId});
});
Meteor.publish('world', function () {
    return world.find({owner:this.userId});
});
Meteor.publish('userData', function() {
    return Meteor.users.find({_id: this.userId}, {fields: { emails: 1, profile: 1 } });
});


