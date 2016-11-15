Template.Trees.onCreated(function () {
    var self = this;
    self.autorun(function () {
        self.subscribe('trees');
        self.subscribe('userData');
    });
});


Template.Trees.helpers({
    trees: ()=> {
        return Trees.find({});
    }
});


Template.Trees.helpers({
    userData: ()=> {
        var user = Meteor.user();
        var email = user.emails[0].address;
        return email;
    }
});

function createObject(x_pos, y_pos, tagname) {
    let object = document.createElement(tagname);
    object.style.left = `${x_pos}px`;
    object.style.top = `${y_pos}px`;
    return object;
}

var displayObjects = () => {
    var tree = document.getElementById("tree");
    var randomX = Math.floor(Math.random() * 2) + 1;
    var randomY = Math.floor(Math.random() * 2) + 1;
    var raindrops = createObject(randomX, randomY, 'img');
    raindrops.src = "/images/lumberjack.jpg";
    raindrops.name = "lumberjack";
    raindrops.id = "lumberjack";
    tree.appendChild(raindrops);
};

Template.Trees.events({

    'click .update'(event) {
        var raindrop = document.getElementById("raindrop");
        event.preventDefault();
        raindrop.className = "animate";
        setTimeout(
            function () {
                raindrop.className = "";
            }, 2000);


        if (this.health >= 25) {
            document.getElementById("imgTree").src = "/images/tree.dead.png";
        }

        if (this.health >= 50) {
            document.getElementById("imgTree").src = "/images/tree.orange.png";
        }


        if (this.health >= 70) {
            document.getElementById("imgTree").src = "/images/tree.green.png";
        }

        if (this.health >= 100) {
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

Template.Trees.events({

    //animatie voor vogel?
    'click .update'(event) {
        var flyby = document.getElementById("flyby");
        event.preventDefault();
        flyby.className = "animate1";
        setTimeout(
            function () {
                flyby.className = "";
            }, 3000);
    }

});



