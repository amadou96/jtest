import { IDemande } from 'app/shared/model/demande.model';

export interface ISemestre {
  id?: number;
  intitule?: string;
  demande?: IDemande;
}

export class Semestre implements ISemestre {
  constructor(public id?: number, public intitule?: string, public demande?: IDemande) {}
}
