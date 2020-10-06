import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IDepartement } from 'app/shared/model/departement.model';

export interface IMembre {
  id?: number;
  matricule?: string;
  dateNaissance?: Moment;
  lieuNaissance?: Moment;
  user?: IUser;
  departement?: IDepartement;
}

export class Membre implements IMembre {
  constructor(
    public id?: number,
    public matricule?: string,
    public dateNaissance?: Moment,
    public lieuNaissance?: Moment,
    public user?: IUser,
    public departement?: IDepartement
  ) {}
}
