import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMembre } from 'app/shared/model/membre.model';

type EntityResponseType = HttpResponse<IMembre>;
type EntityArrayResponseType = HttpResponse<IMembre[]>;

@Injectable({ providedIn: 'root' })
export class MembreService {
  public resourceUrl = SERVER_API_URL + 'api/membres';

  constructor(protected http: HttpClient) {}

  create(membre: IMembre): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(membre);
    return this.http
      .post<IMembre>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(membre: IMembre): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(membre);
    return this.http
      .put<IMembre>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMembre>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMembre[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(membre: IMembre): IMembre {
    const copy: IMembre = Object.assign({}, membre, {
      dateNaissance: membre.dateNaissance && membre.dateNaissance.isValid() ? membre.dateNaissance.format(DATE_FORMAT) : undefined,
      lieuNaissance: membre.lieuNaissance && membre.lieuNaissance.isValid() ? membre.lieuNaissance.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateNaissance = res.body.dateNaissance ? moment(res.body.dateNaissance) : undefined;
      res.body.lieuNaissance = res.body.lieuNaissance ? moment(res.body.lieuNaissance) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((membre: IMembre) => {
        membre.dateNaissance = membre.dateNaissance ? moment(membre.dateNaissance) : undefined;
        membre.lieuNaissance = membre.lieuNaissance ? moment(membre.lieuNaissance) : undefined;
      });
    }
    return res;
  }
}
