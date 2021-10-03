export class LoadingSite {
  public id: number;
  public name: string;


  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;

  }

  public getName(): string {
    return this.name;
  }
}
