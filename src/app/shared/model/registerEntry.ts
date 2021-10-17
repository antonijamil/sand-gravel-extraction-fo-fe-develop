import {Unloading} from '@shared/model/unloading';
import {LoadingSite} from '@shared/model/loadingSite';
import {ConcessionHolder} from '@shared/model/concessionHolder';
import {Vessel} from '@shared/model/vessel';
import {Captain} from '@shared/model/Captain';

export class RegisterEntry {
  id: number;
  captain: Captain;
  ship: Vessel;
  tripNumber: number;
  loadingStartDate: string;
  loadingStopDate: string;
  loadingStartTime: string;
  loadingStopTime: string;
  startDateTime: string;
  stopDateTime: string;
  concessionHolder: ConcessionHolder;
  loadingSite: LoadingSite;
  loadedQuantity: number;
  deviantVolume: string;
  unloadings: Unloading[];

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.captain = data.captain;
      this.ship = data.ship;
      this.tripNumber = data.tripNumber;
      this.loadingStartDate = data.loadingStartDate;
      this.loadingStopDate = data.loadingStopDate;
      this.loadingStartTime = data.loadingStartTime;
      this.loadingStopTime = data.loadingStopTime;
      this.startDateTime = data.startDateTime;
      this.stopDateTime = data.stopDateTime;
      this.concessionHolder = data.concessionHolder;
      this.loadingSite = data.loadingSite;
      this.loadedQuantity = data.loadedQuantity;
      this.deviantVolume = data.deviantVolume;
      this.unloadings = data.unloadings;
    }
  }
}
