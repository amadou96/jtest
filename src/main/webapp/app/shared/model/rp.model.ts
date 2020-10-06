import { IUser } from 'app/core/user/user.model';

export interface IRp {
  id?: number;
  nom?: string;
  prenom?: string;
  matricule?: string;
  user?: IUser;
}

export class Rp implements IRp {
  constructor(public id?: number, public nom?: string, public prenom?: string, public matricule?: string, public user?: IUser) {}
}
