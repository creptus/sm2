/**
 * Created by creptus on 07.01.2018.
 */
const Room = require('./Room');
module.exports = class Bedroom extends Room {
    /**
     *
     */
    constructor() {
        super();
        this.lightSensor = false;
        this.vibroSensor = false;
        this.micSensor = 0;

        this.temperatureSensor = 0;
        this.humiditySensor = 0;

        // super.date = super.getNow();
    }

    /**
     *
     * @param {Object} data
     * @return {boolean}
     */
    setData(data) {
        if (data.controller.name !== 'bedroom') {
            return false;
        }
        // console.log(data);
        for (let s of data.sensors) {
            switch (s.name) {
                case 'light':
                    this.lightSensor = s.value === 'on';
                    break;
                case 'vibro':
                    this.vibroSensor = s.value === 'on';
                    break;
                case 'holl':
                    this.hollSensor = s.value === 'on';
                    break;
                case 'mic':
                    this.micSensor = s.value;
                    break;
                case 'mic3sec':
                    this.mic3secSensor = s.value;
                    break;
                case 'humidity':
                    this.humiditySensor = s.value;
                    break;
                case 'temperature':
                    this.temperatureSensor = s.value;
                    break;
                default:
                    console.log('Unknown', s);
            }
        }

        for (let d of data.devices) {
            switch (d.name) {
                default:
                    console.log('Unknown', d);
            }
        }

        super.date = super.getNow();

        // console.log(this);
    }


};
