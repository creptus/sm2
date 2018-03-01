/**
 * Created by akorolev on 07.12.2017.
 */
const Room = require('./Room');

module.exports = class Aquarium extends Room {
    /**
     *
     */
    constructor() {
        super();
        this.socket0 = false;
        this.socket1 = false;
        this.socket2 = false;
        this.socket3 = false;

        this.lightSensor = false;
        this.vibroSensor = false;
        this.micSensor = 0;

        this.temperatureSensor = 0;
        this.humiditySensor = 0;

        super.date = super.getNow();
    }

    /**
     *
     * @param {Object} data
     * @return {boolean}
     */
    setData(data) {
        if (data.controller.name !== 'aqwa') {
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
                case 'mic':
                    this.micSensor = s.value;
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

        let n = 0;
        for (let d of data.devices) {
            switch (d.name) {
                case 'sokets_0':
                case 'sokets_1':
                case 'sokets_2':
                case 'sokets_3':
                    n = d.name.replace(/[^\d]/igm, '');
                    if (typeof this[`socket${n}`] !== 'undefined') {
                        this[`socket${n}`] = d.value;
                    }
                    break;

                default:
                    console.log('Unknown', d);
            }
        }


        // super.date = super.getNow();
        // console.log(this);
    }


};
