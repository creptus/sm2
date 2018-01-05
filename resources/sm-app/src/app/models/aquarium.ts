export class Aquarium {
  public socket0: boolean;
  public socket1: boolean;
  public socket2: boolean;
  public socket3: boolean;

  public lightSensor: boolean;
  public vibroSensor: boolean;
  public micSensor: number;

  public temperatureSensor: number;
  public humiditySensor: number;

  constructor() {
    this.socket0 = false;
    this.socket1 = false;
    this.socket2 = false;
    this.socket3 = false;

    this.lightSensor = false;
    this.vibroSensor = false;
    this.micSensor = 0;
    this.temperatureSensor = 0;
    this.humiditySensor = 0;
  }
}
