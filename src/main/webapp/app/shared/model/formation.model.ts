import { INiveau } from 'app/shared/model/niveau.model';
import { IDepartement } from 'app/shared/model/departement.model';

export interface IFormation {
  id?: number;
  intitule?: string;
  niveaus?: INiveau[];
  departement?: IDepartement;
}

export class Formation implements IFormation {
  constructor(public id?: number, public intitule?: string, public niveaus?: INiveau[], public departement?: IDepartement) {}
}
