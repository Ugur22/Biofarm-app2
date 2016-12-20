var five = Meteor.npmRequire("johnny-five");
var board = new five.Board();
var oxygen = 0;

//Sensor Sander, Light
var light = 0;

//Sensor Erhan, Moisture
var moisture = 0;

function getOxygen() {
    console.log(oxygen);
    return oxygen;
}

//Sensor Erhan, Moisture
function getMoisture(){
    console.log(moisture);
    return moisture;
}

//Sensor Sander, Light
function getLight(){
    console.log(light);
    return light;
}




function setUp() {
    var sensor = new five.Sensor("A0");

// Sensor Erhan, Moisture
    var sensor1 = new five.Sensor("A1");

// Sensor Sander, Light
    var sensor2 = new five.Sensor ("A2");

    sensor.scale([0, 100]).on("data", function () {
        oxygen = Math.floor(this.scaled);
    });
// Sensor Erhan, Moisture
    sensor1.scale([0, 100]).on("data", function () {
        moisture = Math.floor(this.scaled);
    });
// Sensor Sander, Light
    sensor2.scale([-100,0]).on("data", function () {
        light = Math.floor((this.scaled) * -1);

    })
}

board.on("ready", function () {
    console.log("BOARD CONNECTED.");
    setUp();
});


Meteor.methods({
    getOxygen: function () {
        console.log(oxygen);
        return oxygen;
    },

// Sensor Erhan, Moisture
    getMoisture: function () {
        console.log(moisture);
        return moisture;
    },

    getLight: function() {
        console.log(light);
        return light;
    }

});