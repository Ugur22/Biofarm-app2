import {ReactiveVar} from 'meteor/reactive-var';
Template.Trees.onCreated(function () {
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


Template.World.onCreated(function () {
    var self = this;
    var interval = Meteor.setInterval(function () {
        countCo2.set(countCo2.get() + 1);
        countAir.set(countAir.get() - 1);
        countSunlight.set(countSunlight.get() - 1);
        if (countCo2.get() >= 100 || countAir.get() <= 0 || countAir.get() <= 0) {
            Meteor.clearInterval(interval);
        }
    }, 1000);


    self.autorun(function () {
        self.subscribe('worlds');
    });
});
var countCo2 = new ReactiveVar(0);
var countAir = new ReactiveVar(100);
var countSunlight = new ReactiveVar(100);


Template.World.helpers({
    counter: ()=> {
        return countCo2.get();
    },
    counterAir: ()=> {
        return countAir.get();
    },
    counterSunlight: ()=> {
        return countSunlight.get();
    },
});


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
        const Sunlight = 0;

        Worlds.insert({
            Air,
            C02,
            Sunlight
        });
        FlowRouter.go('trees');
    }
});

Template.Trees.events({
    'click .update'(event, template)
    {
        countAir.set(countAir.get() + 3);
        countCo2.set(countCo2.get() - 3);
        event.preventDefault();
        createRain();
        setTimeout(function () {
            var div = document.getElementById("rain");
            div.innerHTML = "";
        }, 1000);
        if (this.health >= 25) {
            document.getElementById("imgTree").src = "/images/tree.png";
            // var flyby = document.getElementById("flyby");
            event.preventDefault();
            // flyby.className = "animate1";
        }
        if (this.health >= 50) {
              document.getElementById("imgTree").src = "/images/Autumn.png";
        }
        if (this.health >= 70) {
            document.getElementById("imgTree").src = "/images/Summer.png";

        }
        if (this.health >= 100) {
            // flyby = document.getElementById("flyby");
            document.getElementById("imgTree").src = "/images/Winter.png";
            event.preventDefault();
            // flyby.className = "";
            Trees.update(this._id, {
                $set: {health: 0},
            });
        } else {
            Meteor.call('updateHealth', this._id, this.health);
        }
    },
});


