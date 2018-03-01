const config = require('../../../config');
const Sender = require('../../Sender');

const sender = new Sender(); // message sender queue

for (let i = 0; i < 5; i++) {
    let message = `socket_${i}_Off` + `\r\n`;
    sender.addMessage(message, config.controllers.aquarium.port, config.controllers.aquarium.ip);
}

let intervalId = setInterval(() => {
    sender.sendMessage();
    if (sender.countMessages() === 0 && intervalId) {
        clearInterval(intervalId);
    }
}, 1000);