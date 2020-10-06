import { IFormation } from 'app/shared/model/formation.model';

export interface IDepartement {
  id?: number;
  intitule?: string;
  formations?: IFormation[];
}

export class Departement implements IDepartement {
  constructor(public id?: number, public intitule?: string, public formations?: IFormation[]) {}
}
