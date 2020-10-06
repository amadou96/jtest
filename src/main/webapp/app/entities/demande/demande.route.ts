import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDemande, Demande } from 'app/shared/model/demande.model';
import { DemandeService } from './demande.service';
import { DemandeComponent } from './demande.component';
import { DemandeDetailComponent } from './demande-detail.component';
import { DemandeUpdateComponent } from './demande-update.component';

@Injectable({ providedIn: 'root' })
export class DemandeResolve implements Resolve<IDemande> {
  constructor(private service: DemandeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDemande> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((demande: HttpResponse<Demande>) => {
          if (demande.body) {
            return of(demande.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Demande());
  }
}

export const demandeRoute: Routes = [
  {
    path: '',
    component: DemandeComponent,
    data: {
      authorities: ["ROLE_ETUDIANT"],
      pageTitle: 'jtest5App.demande.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DemandeDetailComponent,
    resolve: {
      demande: DemandeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.demande.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DemandeUpdateComponent,
    resolve: {
      demande: DemandeResolve,
    },
    data: {
      authorities: ["ROLE_ETUDIANT"],
      pageTitle: 'jtest5App.demande.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DemandeUpdateComponent,
    resolve: {
      demande: DemandeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.demande.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
