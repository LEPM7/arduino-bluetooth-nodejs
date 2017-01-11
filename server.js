/**
 * Created by luisperalta on 1/8/2017.
 */
const readline = require('readline');
var SerialPort = require("serialport").SerialPort;
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/sem1");

var Schema = mongoose.Schema;

// create a schema
var CalleS = new Schema({
    nombre: String,
    ponderacion: Number,
    ubicacion: String
});

var Calle = mongoose.model('calle', CalleS);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var serialport = new SerialPort("COM6", {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

serialport.on('open', function () {
    console.log('Puerto Abierto');
});

serialport.on('data', function (data) {
    console.log(data.toString());
    var values = data.toString().split(',');
    if(values.length <= 1) return;
    console.log('value{0} = '+values[0]);
    console.log('value{1} = '+values[1]);
    var sem = values[0];
    if(sem == '1') sem = '5874a67cb4504c1db41d9a02';
    else sem = '5874a6a4b4504c1db41d9a03';
    console.log('sem = ' +sem);
    Calle.findOneAndUpdate({ _id: sem}, { ponderacion: values[1] }, function(err, val){
        console.log(val);
        console.log('Calle actualizada');
    });
});

