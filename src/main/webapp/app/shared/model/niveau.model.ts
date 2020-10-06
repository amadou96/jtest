import { IClasse } from 'app/shared/model/classe.model';
import { IFormation } from 'app/shared/model/formation.model';
import { ISemestre } from 'app/shared/model/semestre.model';

export interface INiveau {
  id?: number;
  intitule?: string;
  classes?: IClasse[];
  formation?: IFormation;
  semestres?: ISemestre[];
}

export class Niveau implements INiveau {
  constructor(
    public id?: number,
    public intitule?: string,
    public classes?: IClasse[],
    public formation?: IFormation,
    public semestres?: ISemestre[]
  ) {}
}
