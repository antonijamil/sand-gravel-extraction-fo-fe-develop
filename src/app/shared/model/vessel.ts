export class Vessel {
  public id: number;
  public IMO: number;
  public name: string;
  public blackbox: number;
  public hopperVolume: number;

  constructor(data) {
    this.id = data.id;
    this.IMO = data.IMO;
    this.name = data.name;
    this.blackbox = data.blackbox;
    this.hopperVolume = data.hopperVolume;

  }
}
