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
const config = require('./config');
const util = require('util');
const Aquarium = require('./app/models/Aquarium');
const Bedroom = require('./app/models/Bedroom');


const sender = new Sender(); // message sender queue
let aquarium = new Aquarium();// stat of aquarium
let bedroom = new Bedroom();

const app = express();
app.use(bodyParser.json());

process.on('unhandledRejection', (reason, p) => {
    console.error(p, reason);
});
process.on('rejectionHandled', (p) => {
    console.error(p);
});


app.use('/js', express.static('resources/js'));
app.use('/css', express.static('resources/css'));
app.use('/svg', express.static('resources/svg'));

app.use('/sm-app', express.static('resources/sm-app/dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/resources/sm-app/dist/index.html'));
});

app.post('/api/aquarium/status', (req, res) => {// last static from controller aquarium
    let message = `status\r\n`;
    sender.addMessage(message, config.controllers.aquarium.port, config.controllers.aquarium.ip);
    setTimeout(() => {
        res.json(aquarium);
    }, 1500);
});

app.post('/api/aquarium/socket/switch', (req, res) => {// on/off socket in controller aquarium
    let params = req.body;
    aquarium[`socket${params.socketNumber}`] = params.state;
    let message = `socket_${params.socketNumber}_${params.state ? 'On' : 'Off'}` + `\r\n`;

    sender.addMessage(message, config.controllers.aquarium.port, config.controllers.aquarium.ip);
    res.json({});
});

app.post('/api/bedroom/status', (req, res) => {// last static from controller aquarium
    let message = `status\r\n`;
    sender.addMessage(message, config.controllers.bedroom.port, config.controllers.bedroom.ip);
    setTimeout(() => {
        res.json(bedroom);
    }, 1500);
});

app.post('/api/bedroom/servo/move', (req, res) => {// last static from controller aquarium
    if (typeof req.body.command !== 'undefined') {
        let message = '';
        switch (req.body.command) {
            case 'up':
                message = 'servo_0_up';
                break;
            case 'up_1sec':
                message = 'servo_0_up_1sec';
                break;
            case 'up_2sec':
                message = 'servo_0_up_2sec';
                break;
            case 'down':
                message = 'servo_0_down';
                break;
            case 'down_1sec':
                message = 'servo_0_down_1sec';
                break;
            case 'down_2sec':
                message = 'servo_0_down_2sec';
                break;
            case 'stop':
                message = 'servo_0_stop';
                break;
            default:
                console.log(req.body.command);
        }
        if (message.length > 0) {
            sender.addMessage(`${message}\r\n`, config.controllers.bedroom.port, config.controllers.bedroom.ip);
        }
    }
    res.json({});
});


app.listen(3000);
console.log('web listen: http://localhost:3000/');

setInterval(() => {
    sender.sendMessage();
}, 700);

setInterval(() => {
    let message = `status\r\n`;
    sender.addMessage(message, config.broadcast.port, config.broadcast.ip);
}, 1000*60);

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', async (msg, info) => {
    util.log(`server got: '${msg}' from ${info.address}:${info.port}`);
    let sd = new StatusData(msg.toString());
    sd.controller.ip = info.address;
    // console.log(util.inspect(sd.getData(), {showHidden: false, depth: null}));

    aquarium.setData(sd.getData());
    bedroom.setData(sd.getData());
});

server.on('listening', () => {
    const address = server.address();
    console.log(`udp server listening ${address.address}:${address.port}`);
});

server.bind(41234, function() {
    console.log('udp bind ok 41234');
});


sender.addMessage(`status\r\n`, config.broadcast.port, config.broadcast.ip);

require('dns').lookup(require('os').hostname(), function(err, add, fam) {
    console.log('addr: ' + add);
});


const bot = new Bot(config.telegram.bot.electricHomeBot.token);
let lastUpdate = null;
const b = async () => {
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
    // util.log(data.result.length);
    // console.log(config.telegram.me);
    for (let update of data.result) {
        // console.log(update);
        if (update.message.from.id !== config.telegram.me.id) {
            continue;
        }
        u = update;
    }

    if (u !== null && (lastUpdate == null || u.update_id != lastUpdate.update_id)) {
        lastUpdate = u;
        if (lastUpdate.message.text.toString().toLowerCase() == 'статус') {
            let text = util.inspect(aquarium, {depth: 3});
            text += `\r\n` + util.inspect(bedroom, {depth: 3});
            await bot.sendTextMessage(lastUpdate.message.chat.id, text, lastUpdate.message.id);
        }
        setTimeout(b, 2000);
    } else {
        setTimeout(b, 5000);
    }
};

setTimeout(b, 2000);

