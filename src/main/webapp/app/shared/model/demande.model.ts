import { Moment } from 'moment';
import { ISemestre } from 'app/shared/model/semestre.model';
import { IInscription } from 'app/shared/model/inscription.model';
import { Etat } from 'app/shared/model/enumerations/etat.model';

export interface IDemande {
  id?: number;
  date?: Moment;
  semestre?: string;
  etat?: Etat;
  semestres?: ISemestre[];
  inscription?: IInscription;
}

export class Demande implements IDemande {
  constructor(
    public id?: number,
    public date?: Moment,
    public semestre?: string,
    public etat?: Etat,
    public semestres?: ISemestre[],
    public inscription?: IInscription
  ) {}
}
