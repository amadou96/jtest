// import { RegisterService } from './register.service';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { IEtudiant } from './../../shared/model/etudiant.model';
import { IUser } from './../../core/user/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as moment from 'moment';
import { SERVER_API_URL } from 'app/app.constants';
import { map } from 'rxjs/operators';
type EntityResponseType = HttpResponse<IEtudiant>;
type EntityArrayResponseType = HttpResponse<IEtudiant[]>;

@Injectable({ providedIn: 'root' })
export class RegisterService {
  public resourceUrl = SERVER_API_URL + 'api/etudiants';
  constructor(private http: HttpClient) {}

  save(account: IUser): Observable<IUser> {
    return this.http.post<IUser>(SERVER_API_URL + 'api/register', account);
  }
  findEtudiant(ine: String, prenom: String, nom: String): Observable<EntityResponseType> {
    return this.http
      .get<IEtudiant>(`${this.resourceUrl}/auth/${ine}/${prenom}/${nom}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
   protected convertDateFromClient(etudiant: IEtudiant): IEtudiant {
    const copy: IEtudiant = Object.assign({}, etudiant, {
      dateNaissance: etudiant.dateNaissance && etudiant.dateNaissance.isValid() ? etudiant.dateNaissance.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }
  updateStudent(etudiant: IEtudiant): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(etudiant);
    return this.http
      .put<IEtudiant>(this.resourceUrl+"/update", copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateNaissance = res.body.dateNaissance ? moment(res.body.dateNaissance) : undefined;
    }
    return res;
  }
}
