Worlds = new Mongo.Collection('worlds');
Worlds.allow({
    insert: function (userId, doc) {
        return !!userId;
    },

    update: function (userId, doc) {
        return !!userId;
    }
});


WorldSchema = new SimpleSchema({
    C02: {
        type: Number,
        label: "C02"
    },
    Air: {
        type: Number,
        label: "Air"
    },
    owner: {
        type: String,
        label: "Owner",
        autoValue: function () {
            return this.userId
        },
        autoform: {
            type: "hidden"
        }
    }
});

Worlds.attachSchema(WorldSchema);