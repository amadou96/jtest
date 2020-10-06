import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAnneeAcademique } from 'app/shared/model/annee-academique.model';

type EntityResponseType = HttpResponse<IAnneeAcademique>;
type EntityArrayResponseType = HttpResponse<IAnneeAcademique[]>;

@Injectable({ providedIn: 'root' })
export class AnneeAcademiqueService {
  public resourceUrl = SERVER_API_URL + 'api/annee-academiques';

  constructor(protected http: HttpClient) {}

  create(anneeAcademique: IAnneeAcademique): Observable<EntityResponseType> {
    return this.http.post<IAnneeAcademique>(this.resourceUrl, anneeAcademique, { observe: 'response' });
  }

  update(anneeAcademique: IAnneeAcademique): Observable<EntityResponseType> {
    return this.http.put<IAnneeAcademique>(this.resourceUrl, anneeAcademique, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAnneeAcademique>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAnneeAcademique[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
