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
        var dropLeft = randRange(500, 1100);
        var dropTop = randRange(-1000, 1400);

        $('.rain').append('<div class="drop" id="drop' + i + '"></div>');
        $('#drop' + i).css('left', dropLeft);
        $('#drop' + i).css('top', dropTop);
    }

}

Template.Trees.helpers({
    trees: ()=> {
        return Trees.find({});
    }
});

Template.Trees.helpers({
    worlds: ()=> {
        return Worlds.find({});
    }
});


Template.Trees.helpers({
    userData: ()=> {
        var user = Meteor.user();
        var email = user.emails[0].address;
        return email;
    }
});

Template.Trees.events({

    'click .update'(event) {
        event.preventDefault();
        createRain();
        setTimeout(function () {
            var div = document.getElementById("rain");
            div.innerHTML = "";
        }, 1000);
        if (this.health >= 25) {
            document.getElementById("imgTree").src = "/images/tree.dead.png";
            var flyby = document.getElementById("flyby");
            event.preventDefault();
            flyby.className = "animate1";
        }

        if (this.health >= 50) {
            document.getElementById("imgTree").src = "/images/tree.orange.png";
        }


        if (this.health >= 70) {
            document.getElementById("imgTree").src = "/images/tree.green.png";
        }

        if (this.health >= 100) {
            flyby = document.getElementById("flyby");
            event.preventDefault();
            flyby.className = "";
            document.getElementById("imgTree").src = "/images/tree.black.png";
            Trees.update(this._id, {
                $set: {health: 0},
            });
        } else {
            Trees.update(this._id, {
                $set: {health: this.health + 10},
            });
        }
    },
});


