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

var fullScreenWidth = screen.width;
var fullScreenHeight = screen.availHeight;

// function to generate drops
function createRain() {
    for (var i = 1; i < nbDrop; i++) {
        var dropLeft = randRange(0, fullScreenWidth);
        var dropTop = randRange(-1000, fullScreenHeight);
        $('.rain').append('<div class="drop" id="drop' + i + '"></div>');
        $('#drop' + i).css('left', dropLeft);
        $('#drop' + i).css('top', dropTop);
    }
}


Template.World.onCreated(function () {
    var self = this;
    var IntervalOxygen = Meteor.setInterval(function () {

// Sensor Sander, Oxygen
        Meteor.call('getOxygen', function (err, res) {
            if (err) {
                console.log(err);
            } else {
                oxygen.set(res);
            }
        });

//Sensor Erhan, Moisture
        Meteor.call('getMoisture', function (err, res) {
            if (err) {
                console.log(err);
            } else {
                moisture.set(res);
            }
        });

        Meteor.call('getLight', function (err, res) {
            if (err) {
                console.log(err);
            } else {
                light.set(res);
            }
        });

        if (oxygen.get() < 45   ) {
            Co2.set(80);
        } else {
            Co2.set(30);
        }


        // Meteor.call('getC02', function (err, res) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log(res);
        //         Co2.set(res);
        //     }
        // });


    }, 100);
    self.autorun(function () {
        self.subscribe('worlds');
    });
});
var Co2 = new ReactiveVar(0);
var oxygen = new ReactiveVar(0);

// Sensor Erhan, Moisture
var moisture = new ReactiveVar(0);
// Sensor Sander, Light
var light = new ReactiveVar(0);


Template.World.helpers({
    counterC02: ()=> {
        // Meteor.call('getC02', function (err, res) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         Co2.set(res);
        //     }
        // });
        return Co2.get();
    },

    get02: () => {
        Meteor.call('getOxygen', function (err, res) {
            if (err) {
                console.log(err);
            } else {
                oxygen.set(res);
            }
        });

        return oxygen.get();
    },

//Sensor Erhan, Moisture
    get03: () => {
        Meteor.call('getMoisture', function (err, res) {
            if (err) {
                console.log(err);
            } else {
                moisture.set(res);
            }
        });

        return moisture.get();
    },

//Sensor Sander, Light
    get04: () => {
        Meteor.call('getLight', function (err, res) {
            if (err) {
                console.log(err);
            } else {
                light.set(res);
            }
        });

        return light.get();
    }

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
});

Template.Tree.helpers({
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
        event.preventDefault();
        createRain();
        setTimeout(function () {
            var div = document.getElementById("rain");
            div.innerHTML = "";
        }, 1000);
        if (this.health >= 25) {
            document.getElementById("imgTree").src = "/images/Winter.png";
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
            document.getElementById("imgTree").src = "/images/tree.png";
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


