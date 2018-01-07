export class Bedroom {


  public lightSensor: boolean;
  public vibroSensor: boolean;
  public micSensor: number;

  public temperatureSensor: number;
  public humiditySensor: number;

  constructor() {


    this.lightSensor = false;
    this.vibroSensor = false;
    this.micSensor = 0;
    this.temperatureSensor = 0;
    this.humiditySensor = 0;
  }
}
