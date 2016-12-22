var five = Meteor.npmRequire("johnny-five");
var board = new five.Board();
var oxygen = 0;
var C02 = 0;

//Sensor Sander, Light
var light = 0;

//Sensor Erhan, Moisture
var moisture = 0;

function getOxygen() {
    // console.log(oxygen);
    return oxygen;
}

//Sensor Erhan, Moisture
function getMoisture() {
    console.log(moisture);
    return moisture;
}

//Sensor Sander, Light
function getLight() {
    // console.log(light);
    return light;
}

function getC02() {
    return C02;
}


function setUp() {
    var power = new five.Pin("6");

    var sensor = new five.Sensor("A0");

// Sensor Erhan, Moisture
    var sensor1 = new five.Sensor("A1");

// Sensor Sander, Light
    var sensor2 = new five.Sensor("A2");

    // sensor for C02
    var sensor3 = new five.Sensor("A3");

    sensor.scale([0, 100]).on("data", function () {
        oxygen = Math.floor(this.scaled);
    });
// Sensor Erhan, Moisture
    sensor1.scale([0, 255]).on("data", function () {
        moisture = Math.floor(this.scaled);
    });
// Sensor Sander, Light
    sensor2.scale([-100, 0]).on("data", function () {
        light = Math.floor((this.scaled) * -1);

    })

    // sensor for C02
    sensor3.on("change", function (value) {
        C02 = Math.floor(this.value);
        // console.log(C02)

    })
}

board.on("ready", function () {
    console.log("BOARD CONNECTED.");
    setUp();
});


Meteor.methods({
    getOxygen: function () {
        return oxygen;
    },

// Sensor Erhan, Moisture
    getMoisture: function () {
        return moisture;
    },

    getLight: function () {
        return light;
    },

    getC02: function () {
        return C02;
    }

});