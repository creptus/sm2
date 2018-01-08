export class Bedroom {


  public lightSensor: boolean;
  public vibroSensor: boolean;
  public micSensor: number;
  public mic3secSensor?: number;

  public temperatureSensor: number;
  public humiditySensor: number;

  public hollSensor?: boolean;


  constructor() {


    this.lightSensor = false;
    this.vibroSensor = false;
    this.hollSensor = false;
    this.micSensor = 0;
    this.mic3secSensor = 0;
    this.temperatureSensor = 0;
    this.humiditySensor = 0;
  }
}
