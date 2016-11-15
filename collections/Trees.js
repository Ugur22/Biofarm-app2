Trees = new Mongo.Collection('trees');
Trees.allow({
    insert: function (userId, doc) {
        return !!userId;
    },

    update: function (userId, doc) {
        return !!userId;
    }
});


TreeSchema = new SimpleSchema({
    health: {
        type: Number,
        label: "Health"
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
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function () {
            return new Date();
        },
        autoform: {
            type: "hidden"
        }
    }
});

Trees.attachSchema(TreeSchema);