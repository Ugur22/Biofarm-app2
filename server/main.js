var five = Meteor.npmRequire("johnny-five");
var board = new five.Board();
var co2 = 0;

function getCo2() {
    console.log(co2);
    return co2;
}

function setUp() {
    var sensor = new five.Sensor("A0");

    sensor.scale([0, 100]).on("data", function () {
        co2 = Math.floor(this.scaled);
    });
}

board.on("ready", function () {
    console.log("BOARD CONNECTED.");
    setUp();
});


Meteor.methods({
    getCo2: function () {
        console.log(co2);
        return co2;
    }

});
