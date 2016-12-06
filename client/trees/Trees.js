import {ReactiveVar} from 'meteor/reactive-var';
Template.Trees.onCreated(function () {
    this.changeHealth = new ReactiveVar(0);
    var self = this;
    self.autorun(function () {
        self.subscribe('trees');
        self.subscribe('userData');
        self.subscribe('worlds');
    });
});

Template.NewTree.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.subscribe('trees');
    });
});

var nbDrop = 858;


// function to generate a random number range.
function randRange(minNum, maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}


// function to generate drops
function createRain() {

    for (var i = 1; i < nbDrop; i++) {
        var dropLeft = randRange(0, 1600);
        var dropTop = randRange(-1000, 1400);

        $('.rain').append('<div class="drop" id="drop' + i + '"></div>');
        $('#drop' + i).css('left', dropLeft);
        $('#drop' + i).css('top', dropTop);
    }

}


Template.Trees.helpers({
    trees: ()=> {
        return Trees.find({});
    },
    worlds: ()=> {
        return Worlds.find({});
    },
    userData: ()=> {
        var user = Meteor.user();
        var email = user.emails[0].address;
        return email;
    },

    increaseHealth: ()=> {
        return Template.instance().changeHealth.get();
    },
    healthTree: ()=> {
        var tree = Trees.find({}, {fields: {health: 1}}).fetch();
        var health = tree[0].health;
        return health;
    }
});

Template.NewTree.events({
    'submit .new-Tree'(event){
        event.preventDefault();
        const health = 0;

        Trees.insert({
            health
        });

        const Air = 0;
        const C02 = 0;

        Worlds.insert({
            Air,
            C02
        });
        FlowRouter.go('trees');
    }
});

Template.Trees.events({
    'click .update'(event, template)
    {

        Meteor.setInterval(function () {
            template.changeHealth.set(template.changeHealth.get() + 10);
        }, 1000);
        event.preventDefault();
        createRain();
        setTimeout(function () {
            var div = document.getElementById("rain");
            div.innerHTML = "";
        }, 1000);
        if (this.health >= 25) {
            document.getElementById("imgTree").src = "/images/tree.dead.png";
            // var flyby = document.getElementById("flyby");
            event.preventDefault();
            // flyby.className = "animate1";
        }
        if (this.health >= 50) {
            document.getElementById("imgTree").src = "/images/tree.orange.png";
        }
        if (this.health >= 70) {
            document.getElementById("imgTree").src = "/images/tree.green.png";
        }
        if (this.health >= 100) {
            // flyby = document.getElementById("flyby");
            event.preventDefault();
            // flyby.className = "";
            document.getElementById("imgTree").src = "/images/tree.black.png";
            Trees.update(this._id, {
                $set: {health: 0},
            });
        } else {
            Meteor.call('updateHealth', this._id, this.health);
        }
    },
});


