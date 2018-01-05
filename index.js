/**
 * Created by akorolev on 07.12.2017.
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const dgram = require('dgram');

const server = dgram.createSocket('udp4');
const StatusData = require('./app/StatusData');
const Sender = require('./app/Sender');

const Bot = require('./app/Bot');

const config=require('./config');

const fs = require('fs');
const util = require('util');


const Aquarium = require('./app/models/Aquarium');


const sender = new Sender(); //message sender queue
let aquarium = new Aquarium();//stat of aquarium

const app = express();
app.use(bodyParser.json());


app.use('/js', express.static('resources/js'));
app.use('/css', express.static('resources/css'));

app.use('/sm-app', express.static('resources/sm-app/dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/resources/sm-app/dist/index.html'));
});

app.post('/api/aquarium/status', (req, res) => {//last static from controller aquarium
    //let str2 = `!:aqwa|light: on;|vibro1: off;|mic: 1005;|humidity: 24.60;|temperature: 25.20;|sokets:0 true;1 false;2 false;3 false;|`;
    //let sd = new StatusData(str2);
    //console.log(sd.getData());
    //aquarium.setData(sd.getData());

    let message = `status` + "\r\n";
    sender.addMessage(message, 41100, '192.168.1.188');
    setTimeout(() => {
        res.json(aquarium);
    }, 4000);

});

app.post('/api/aquarium/socket/switch', (req, res) => {//on/off socket in controller aquarium
    let params = req.body;
    aquarium[`socket${params.socketNumber}`] = params.state;
    let message = `socket_${params.socketNumber}_${params.state ? 'On' : 'Off'}` + "\r\n";

    sender.addMessage(message, 41100, '192.168.1.188');
    res.json({});
});


app.listen(3000);
console.log('web listen: http://localhost:3000/');


let senderIntervalId = setInterval(() => {
    sender.sendMessage();
}, 1000);

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', async(msg, info) => {
    util.log(`server got: '${msg}' from ${info.address}:${info.port}`);
    let sd = new StatusData(msg.toString());
    sd.controller.ip = info.address;
    console.log(util.inspect(sd.getData(), {showHidden: false, depth: null}));

    aquarium.setData(sd.getData());
});

server.on('listening', () => {
    const address = server.address();
    console.log(`udp server listening ${address.address}:${address.port}`);
});

server.bind(41234, function () {
    console.log('udp bind ok 41234');
});

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: ' + add);
})


const bot = new Bot(config.telegram.bot.electricHomeBot.token);
let lastUpdate = null;
const b = async() => {
    const data = await bot.getUpdates();

    if (!data.ok) {
        console.error(data);
        setTimeout(b, 5000);
        return;
    }
    if (typeof data.result != 'object') {
        setTimeout(b, 5000);
        return;
    }
    let u = null;
    //util.log(data.result.length);
    for (let update of data.result) {
        //console.log(update);
        u = update;
    }

    if (u !== null && (lastUpdate == null || u.update_id != lastUpdate.update_id)) {
        lastUpdate = u;
        if (lastUpdate.message.text.toString().toLowerCase() == 'статус') {
            let text = util.inspect(aquarium, {depth: 3});
            await bot.sendTextMessage(lastUpdate.message.chat.id, text, lastUpdate.message.id);
        }
        setTimeout(b, 2000);
    } else {
        setTimeout(b, 5000);
    }
};

setTimeout(b, 2000);

