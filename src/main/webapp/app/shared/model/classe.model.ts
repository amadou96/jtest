import { INiveau } from 'app/shared/model/niveau.model';

export interface IClasse {
  id?: number;
  intitule?: string;
  niveau?: INiveau;
}

export class Classe implements IClasse {
  constructor(public id?: number, public intitule?: string, public niveau?: INiveau) {}
}
