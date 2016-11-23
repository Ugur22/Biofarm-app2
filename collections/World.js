World = new Mongo.Collection('world');
World.allow({
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

World.attachSchema(WorldSchema);