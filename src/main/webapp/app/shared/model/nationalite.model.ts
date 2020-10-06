export interface INationalite {
  id?: number;
  intitule?: string;
}

export class Nationalite implements INationalite {
  constructor(public id?: number, public intitule?: string) {}
}
