import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { INationalite } from 'app/shared/model/nationalite.model';

export interface IEtudiant {
  id?: number;
  nom?: string;
  prenom?: string;
  dateNaissance?: Moment;
  email?: string;
  lieuNaissance?: string;
  adresse?: string;
  telephone?: string;
  ine?: string;
  nin?: string;
  user?: IUser;
  nationalite?: INationalite;
}

export class Etudiant implements IEtudiant {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public dateNaissance?: Moment,
    public email?: string,
    public lieuNaissance?: string,
    public adresse?: string,
    public telephone?: string,
    public ine?: string,
    public nin?: string,
    public user?: IUser,
    public nationalite?: INationalite
  ) {}
}
