import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRp } from 'app/shared/model/rp.model';

type EntityResponseType = HttpResponse<IRp>;
type EntityArrayResponseType = HttpResponse<IRp[]>;

@Injectable({ providedIn: 'root' })
export class RpService {
  public resourceUrl = SERVER_API_URL + 'api/rps';

  constructor(protected http: HttpClient) {}

  create(rp: IRp): Observable<EntityResponseType> {
    return this.http.post<IRp>(this.resourceUrl, rp, { observe: 'response' });
  }

  update(rp: IRp): Observable<EntityResponseType> {
    return this.http.put<IRp>(this.resourceUrl, rp, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRp[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
