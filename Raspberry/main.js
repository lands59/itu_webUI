// Constants
const
DB_URL = 'mongodb://115.178.65.182:27017/trustbnb-dev';
const
GW_MAC = '12:D2:39:0A:BA:02';
const
UPLOAD_DATA = true;
const
USE_ONE_RECORD = true;
const
TEST_ON_PC = false; // Should be 'false'

// Include
var sensor;
if (!TEST_ON_PC)
    sensor = require('./sensor.js');
var mongoose = require('mongoose');

// Callbacks
var onConnected = function(type, connected) {
    console.log(type + '\tConnected : ' + connected);
};

var onRecieved = function(type, values) {
    console.log(type + '\tRecieved : ' + values);

    switch (type) {
    case sensor.type.SMOKE:
        send("smoke", values[0], "BW Smoke Detection Sensor");
        break;
    case sensor.type.NOISE:
        send("noise", values[0], "BW Noise Sensor");
        break;
    case sensor.type.MULTI:
        send("temp", values[0], "BW Temperature Sensor");
        send("humid", values[1], "BW Humidity Sensor");
        send("bright", values[2], "BW Brightness Sensor");
        break;
    }
};

var send = function(name, data, comment) {
    if (!UPLOAD_DATA)
        return;

    console.log("\tSend : " + name + "\tdata : " + data);

    if (USE_ONE_RECORD) {
        var dev = {
            deviceId : GW_MAC,
            deviceName : name,
            comment : comment,
            status : data
        }; // Do not include _id field

        Device.findOneAndUpdate({
            deviceName : name
        }, dev, {
            'upsert' : 'true',
            'sort' : {
                '_id' : -1
            }
        }, function(err, device) {
            if (err)
                console.log("\t\tSave error: " + err);
            else
                console.log("\t\tSaved successfully");
        });

    } else {
        var dev = new Device({
            deviceId : GW_MAC,
            deviceName : name,
            comment : comment,
            status : data
        });

        dev.save(function(err) {
            if (err)
                console.log("\t\tSave error: " + err);
            else
                console.log("\t\tSaved successfully");
        });
    }
};

// Main
var devSchema = mongoose.Schema({
    deviceId : String,
    deviceName : String,
    status : Number,
    comment : String
});
var Device = mongoose.model('bwdevice', devSchema, 'bwdevice');
mongoose.connect(DB_URL); // DB URL

var sm; // Sensor Manager
var dbOpened = false;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("DB opened !!!")

    dbOpened = true;

    if (!TEST_ON_PC) {
        sm = new sensor.SensorManager();
        sm.start(onConnected, onRecieved);
    }

    if (TEST_ON_PC) {
        setInterval(function() {
            var rand = Math.random() * (100 - 50) + 50;
            send("noise", rand | 0, "BW Noise Sensor");
        }, 1000);
    }
});

if (TEST_ON_PC) {
    setTimeout(function() {
        dbOpened = false;
        if (sm != null)
            sm.stop();
        process.exit();
    }, 10000);
}
