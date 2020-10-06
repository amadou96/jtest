import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INiveau, Niveau } from 'app/shared/model/niveau.model';
import { NiveauService } from './niveau.service';
import { NiveauComponent } from './niveau.component';
import { NiveauDetailComponent } from './niveau-detail.component';
import { NiveauUpdateComponent } from './niveau-update.component';

@Injectable({ providedIn: 'root' })
export class NiveauResolve implements Resolve<INiveau> {
  constructor(private service: NiveauService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INiveau> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((niveau: HttpResponse<Niveau>) => {
          if (niveau.body) {
            return of(niveau.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Niveau());
  }
}

export const niveauRoute: Routes = [
  {
    path: '',
    component: NiveauComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.niveau.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NiveauDetailComponent,
    resolve: {
      niveau: NiveauResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.niveau.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NiveauUpdateComponent,
    resolve: {
      niveau: NiveauResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.niveau.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NiveauUpdateComponent,
    resolve: {
      niveau: NiveauResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.niveau.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
