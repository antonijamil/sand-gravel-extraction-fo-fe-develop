export class ConcessionHolder {
  public id: number;
  public name: string;
  public concessionHolderNumber: number;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.concessionHolderNumber = data.concessionHolderNumber;
  }
}
