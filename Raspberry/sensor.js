var i2c = require('i2c');

var smokeBus = new i2c(0x01, {
    device : '/dev/i2c-1'
});
var noiseBus = new i2c(0x02, {
    device : '/dev/i2c-1'
});
var multiBus = new i2c(0x03, {
    device : '/dev/i2c-1'
});

const index = {
    SMOKE : 0x00,
    NOISE : 0x01,
    MULTI : 0x02
};

const type = {
    SMOKE : 'SMOKE',
    NOISE : 'NOISE',
    MULTI : 'MULTI'
};

const description = {
    SMOKE : 'Smoking detection',
    NOISE : 'Noise detection',
    MULTI : 'Temperature, Humidity, Brightness'
}

const interval = {
    SMOKE : 3000,
    NOISE : 3000,
    MULTI : 3000
};

exports.type = type;
var connect = [ 0, 0, 0 ];

exports.SensorManager = function() {
    this._interval = [ interval.SMOKE, interval.NOISE, interval.MULTI ];
    console.log(this._interval);
    this._intv = [ 3 ];
    this._callback = [
            // index 0, Smoke
            function(onConnected, onRecieved) {
                smokeBus.read(2, function(err, res) {
                    var connected = 0;
                    var smoke;
                    if (err !== null) {
                        connected = 0;
                    } else {
                        // Little --> Big endian
                        smoke = ((res[1] << 8) + res[0]);
                        connected = 1;
                    }
                    if (connect[index[type.SMOKE]] !== connected
                            && onConnected !== null) {
                        connect[index[type.SMOKE]] = connected;
                        onConnected(type.SMOKE, connected, description.SMOKE);
                    }
                    if (connected == 1 && onRecieved !== null) {
                        onRecieved(type.SMOKE, [ smoke ]);
                    }

                });
            },
            // index 1, Noise
            function(onConnected, onRecieved) {
                noiseBus.read(2, function(err, res) {
                    var connected = 0;
                    var noise;
                    if (err !== null) {
                        connected = 0;
                    } else {
                        // Little --> Big endian
                        noise = ((res[1] << 8) + res[0]);
                        connected = 1;
                    }
                    if (connect[index[type.NOISE]] !== connected
                            && onConnected !== null) {
                        connect[index[type.NOISE]] = connected;
                        onConnected(type.NOISE, connected, description.NOISE);
                    }
                    if (connected == 1 && onRecieved !== null) {
                        onRecieved(type.NOISE, [ noise ]);
                    }

                });
            },
            // index 2, Multi
            function(onConnected, onRecieved) {
                multiBus.read(6, function(err, res) {
                    var connected = 0;
                    var temp;
                    var humid;
                    var bright;
                    if (err !== null) {
                        connected = 0;
                    } else {
                        // Little --> Big endian
                        temp = ((res[1] << 8) + res[0]);
                        humid = ((res[3] << 8) + res[2]);
                        bright = ((res[5] << 8) + res[4]);
                        connected = 1;
                    }
                    if (connect[index[type.MULTI]] !== connected
                            && onConnected !== null) {
                        connect[index[type.MULTI]] = connected;
                        onConnected(type.MULTI, connected, description.MULTI);
                    }
                    if (connected == 1 && onRecieved !== null) {
                        onRecieved(type.MULTI, [ temp, humid, bright ]);
                    }

                });
            }, ];

};

exports.SensorManager.prototype = {

    start : function(onConnected, onRecieved) {

        console.log("start");
        // this._intv[0] = setInterval(this._callback[0], 1000, callback);
        // var i = type.SMOKE;
        this._onConnected = onConnected;
        for ( var i in index) {
            console.log('\tStart observing data : ' + type[i] + ' '
                    + interval[i] + 'ms');
            this._intv[index[i]] = setInterval(this._callback[index[i]],
                    interval[i], onConnected, onRecieved);
        }
    },

    stop : function() {
        console.log("stop");
        for ( var i in index) {
            console.log('\tStop observing data : ' + type[i]);
            clearInterval(this._intv[index[i]]);
            if (connect[index[i]])
                this._onConnected(type[i], false);
        }
        connected = [ 0, 0, 0 ];
    },
}