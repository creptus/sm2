/**
 * Created by akorolev on 03.10.2017.
 */
/**
 *
 * @type {StatusData}
 */
module.exports = class StatusData {
    /**
     *
     * @param {string} data
     */
    constructor(data = '') {
        this.controller = {
            name: '',
            info: '',
            ip: '',
            port: ''
        };

        this.sensors = [];
        this.devices = [];

        this.unknown = [];

        this._availableNames = {
            sensors: ['light', 'vibro', 'mic', 'humidity', 'temperature'],
            devices: ['socket', 'sockets']
        };

        if (data != '') {
            this.parse(data);
        }
    }

    /**
     *
     * @param {string} name
     * @return {boolean}
     * @private
     */
    _isSensor(name = '') {
        name = name.toLowerCase();
        for (let sensorName of this._availableNames.sensors) {
            if (name.indexOf(sensorName) != -1) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     * @param {string} name
     * @return {boolean}
     * @private
     */
    _isDevice(name = '') {
        name = name.toLowerCase().replace('soket', 'socket');
        for (let sensorName of this._availableNames.devices) {
            if (name.indexOf(sensorName) != -1) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     * @param {string} data  !<command optional>:<controller name> <port optional>
     * @private
     */
    _parseController(data = '') {
        let _parts = data.substring(1).split(':');
        if (_parts.length > 0) {
            this.controller.info = _parts[0];
        }
        if (_parts.length > 1) {
            _parts = _parts[1].split(' ');
            if (_parts.length > 0) {
                if (_parts.length == 1) {
                    this.controller.name = _parts[0];
                } else {
                    this.controller.port = _parts[_parts.length - 1].replace(/[^0-9]/igm, '');
                    if (this.controller.port == '') {
                        this.controller.name = _parts.join(' ');
                    } else {
                        _parts.pop();
                        this.controller.name = _parts.join(' ');
                    }
                }
            }
        }
    }

    /**
     *
     * @param {string} data
     * @private
     */
    _parseSensor(data = '') {
        let parts = data.split(':');
        let res = {
            name: parts.shift(),
            value: ''
        };
        let numbersRegex = /^[0-9.]+$/;
        if (parts.length > 0) {
            parts = parts.join(':').split(';');
        }

        for (let v of parts) {
            v = v.trim().toLowerCase();
            if (['on', 'off'].indexOf(v) != -1) {
                res.value = v;
            } else if (numbersRegex.test(v)) {
                res.value = parseFloat(v);
            }
        }
        this.sensors.push(res);
        // console.log(data);
    }

    /**
     *
     * @param {string} data
     * @private
     */
    _parseDevice(data) {
        let parts = data.split(':');
        let baseName = parts.shift();
        let res = {
            name: '',
            value: ''

        };

        if (parts.length > 0) {
            parts = parts.join(':').split(';');
        }
        let _v;
        for (let v of parts) {
            v = v.trim().toLowerCase();
            v = v.split(' ');
            _v = {
                key: '',
                value: ''
            };
            if (v.length > 0) {
                _v.key = v.shift();
            }
            if (v.length > 0) {
                _v.value = v.join(' ');
                if (_v.value === 'true') {
                    _v.value = true;
                }
                if (_v.value === 'false') {
                    _v.value = false;
                }
            }
            if (_v.key == '' && _v.value == '') {
                continue;
            }
            res = {
                name: '',
                value: ''

            };
            res.name = `${baseName}_${_v.key}`;
            res.value = _v.value;
            this.devices.push(res);
        }
    }

    /**
     *
     * @param {string} data
     */
    parse(data = '') {
        let parts = data.split('|');
        let _parts;
        for (let p of parts) {
            p = p.trim();
            if (p.substring(0, 1) == '!') {
                // !<command optional>:<controller name> <port optional>
                this._parseController(p);
                continue;
            }

            // <device/sensor name>:
            _parts = p.split(':');
            // console.log(_parts);
            if (_parts.length > 1) {
                if (this._isSensor(_parts[0])) {
                    this._parseSensor(p);
                    continue;
                }
                if (this._isDevice(_parts[0])) {
                    this._parseDevice(p);
                }
            }
        }
    }

    /**
     *
     * @return {{controller: ({name: string, info: string, ip: string, port: string}|*), sensors: Array, 
     * devices: Array}}
     */
    getData() {
        return {
            controller: this.controller,
            sensors: this.sensors,
            devices: this.devices
        };
    }
};
