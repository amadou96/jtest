import { Moment } from 'moment';
import { INiveau } from 'app/shared/model/niveau.model';
import { IAnneeAcademique } from 'app/shared/model/annee-academique.model';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { IClasse } from 'app/shared/model/classe.model';

export interface IInscription {
  id?: number;
  dateInscription?: Moment;
  niveauIns?: INiveau;
  anneeAcademique?: IAnneeAcademique;
  etudiant?: IEtudiant;
  classe?: IClasse;
}

export class Inscription implements IInscription {
  constructor(
    public id?: number,
    public dateInscription?: Moment,
    public niveauIns?: INiveau,
    public anneeAcademique?: IAnneeAcademique,
    public etudiant?: IEtudiant,
    public classe?: IClasse
  ) {}
}
