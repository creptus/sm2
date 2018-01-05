/**
 * Created by akorolev on 20.03.2017.
 */

const request = require('request');

module.exports = class Bot {
    /**
     *
     * @param {string} token
     */
    constructor(token = '') {
        this._token = token;
    }

    /**
     *
     * @param {number} offset
     * @return {Object}
     */
    async getUpdates(offset) {
        let data;
        if (typeof offset !== 'undefined') {
            data = await this._req('getUpdates', 'GET', {offset: offset});
        } else {
            data = await this._req('getUpdates');
        }
        return data;
    }

    /**
     *
     * @param {number} chatId
     * @param {string} text
     * @param {number} replyToMessageId
     * @return {Object}
     */
    async sendTextMessage(chatId, text, replyToMessageId) {
        const data = {
            chat_id: chatId,
            text: text,
            reply_to_message_id: replyToMessageId,
            parse_mode: 'HTML'
        };
        return await this._req('sendMessage', 'POST', data);
    }

    /**
     *
     * @param {string} apiMethod
     * @param {string} httpMethod
     * @param {Object} sendData
     * @return {Promise<T>|Promise}
     * @private
     */
    _req(apiMethod, httpMethod = 'GET', sendData) {
        const self = this;
        // console.log(sendData);
        return new Promise((resolve, reject)=> {
            let options = {
                url: 'https://api.telegram.org/bot' + self._token + '/' + apiMethod,
                headers: {
                    'Connection': 'Keep-Alive',
                    'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:44.0) Gecko/20100101 Firefox/44.0',
                    'Host': 'api.telegram.org'
                },
                method: httpMethod
            };
            if (httpMethod === 'POST' && typeof sendData !== 'undefined') {
                options.headers['content-type'] = 'application/json';
                options.body = JSON.stringify(sendData);
            }
            request(options, (error, response, body) => {
                let data = {};
                if (error) {
                    console.error(error);
                } else {
                    if (response && response.statusCode == 200) {
                        try {
                            data = JSON.parse(body.toString());
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }
                resolve(data);
            });
        });
    }
};
