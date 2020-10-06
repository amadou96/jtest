import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMembre, Membre } from 'app/shared/model/membre.model';
import { MembreService } from './membre.service';
import { MembreComponent } from './membre.component';
import { MembreDetailComponent } from './membre-detail.component';
import { MembreUpdateComponent } from './membre-update.component';

@Injectable({ providedIn: 'root' })
export class MembreResolve implements Resolve<IMembre> {
  constructor(private service: MembreService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMembre> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((membre: HttpResponse<Membre>) => {
          if (membre.body) {
            return of(membre.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Membre());
  }
}

export const membreRoute: Routes = [
  {
    path: '',
    component: MembreComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'jtest5App.membre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MembreDetailComponent,
    resolve: {
      membre: MembreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.membre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MembreUpdateComponent,
    resolve: {
      membre: MembreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.membre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MembreUpdateComponent,
    resolve: {
      membre: MembreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.membre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
