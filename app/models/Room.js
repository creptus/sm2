/**
 * Created by akorolev on 30.01.2018.
 */


module.exports = class Room {

    constructor() {
        this.date = '';
        // this.date = this.getNow();
    }

    /**
     *
     * @return {string}
     */
    getNow() {
        const d = new Date();
        let date = `${d.getFullYear()}-${(d.getMonth() < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1)}-${ (d.getDate() < 10 ? '0' + d.getDate() : d.getDate())}`;
        date += ` ${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}:${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}:${d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()}`;
        return date;

    }
}