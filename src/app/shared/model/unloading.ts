export class Unloading {
  public unloadedVolume: number;
  public unloadingPlace: string;
  public destination: string;
  public destinationCountry: string;

  constructor(unloadedVolume: number, unloadingPlace: string, destination: string, destinationCountry: string) {
    this.unloadedVolume = unloadedVolume;
    this.unloadingPlace = unloadingPlace;
    this.destination = destination;
    this.destinationCountry = destinationCountry;
  }
}
