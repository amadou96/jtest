import { IInscription } from 'app/shared/model/inscription.model';

export interface IAnneeAcademique {
  id?: number;
  intitule?: string;
  inscriptions?: IInscription[];
}

export class AnneeAcademique implements IAnneeAcademique {
  constructor(public id?: number, public intitule?: string, public inscriptions?: IInscription[]) {}
}
