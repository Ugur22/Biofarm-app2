Meteor.publish('trees', function () {
    return Trees.find({owner: this.userId}, {limit: 1});
});

Meteor.publish('worlds', function () {
    return Worlds.find({owner: this.userId}, {limit: 1});
});
Meteor.publish('userData', function () {
    return Meteor.users.find({_id: this.userId}, {fields: {emails: 1, profile: 1}});
});



