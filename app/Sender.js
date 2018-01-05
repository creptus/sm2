/**
 * Created by akorolev on 08.12.2017.
 */

const dgram = require('dgram');
const util = require('util')

class Message {
    constructor(message, port, ip) {
        this.message = message;
        this.port = port;
        this.ip = ip;
    }
}

module.exports = class Sender {
    constructor() {
        this._messages = [];
    }

    /**
     *
     * @param {string} message
     * @param {number} port
     * @param {string} ip
     */
    addMessage(message, port, ip) {
        this._messages.push(new Message(message, port, ip));
    }

    /**
     *
     */
    sendMessage() {
        if (this._messages.length == 0) {
            return;
        }
        let m = this._messages.shift();
        if (m.message.indexOf("\r\n") === -1) {
            m.message += "\r\n";
        }
        const client = dgram.createSocket('udp4');
        client.send(Buffer.from(m.message), m.port, m.ip, (err) => {
            util.log(m.message, err);
            client.close();
        });
    }
}