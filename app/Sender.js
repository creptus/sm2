/**
 * Created by akorolev on 08.12.2017.
 */

const dgram = require('dgram');
const util = require('util');
/**
 *
 */
class Message {
    /**
     *
     * @param {string} message
     * @param {number} port
     * @param {string} ip
     */
    constructor(message, port, ip) {
        this.message = message;
        this.port = port;
        this.ip = ip;
    }
}

/**
 *
 * @type {Sender}
 */
module.exports = class Sender {
    /**
     *
     */
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
     * @return {number}
     */
    countMessages(){
        return this._messages.length;
    }

    /**
     *
     */
    sendMessage() {
        if (this._messages.length == 0) {
            return;
        }
        let m = this._messages.shift();
        if (m.message.indexOf(`\r\n`) === -1) {
            m.message += `\r\n`;
        }
        const client = dgram.createSocket('udp4');
        client.bind(function() {
            client.setBroadcast(true);
            client.send(Buffer.from(m.message), m.port, m.ip, (err) => {
                util.log(m.message, err);
                client.close();
            });
        });
    }
};
