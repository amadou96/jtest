import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAnneeAcademique, AnneeAcademique } from 'app/shared/model/annee-academique.model';
import { AnneeAcademiqueService } from './annee-academique.service';
import { AnneeAcademiqueComponent } from './annee-academique.component';
import { AnneeAcademiqueDetailComponent } from './annee-academique-detail.component';
import { AnneeAcademiqueUpdateComponent } from './annee-academique-update.component';

@Injectable({ providedIn: 'root' })
export class AnneeAcademiqueResolve implements Resolve<IAnneeAcademique> {
  constructor(private service: AnneeAcademiqueService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAnneeAcademique> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((anneeAcademique: HttpResponse<AnneeAcademique>) => {
          if (anneeAcademique.body) {
            return of(anneeAcademique.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AnneeAcademique());
  }
}

export const anneeAcademiqueRoute: Routes = [
  {
    path: '',
    component: AnneeAcademiqueComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.anneeAcademique.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AnneeAcademiqueDetailComponent,
    resolve: {
      anneeAcademique: AnneeAcademiqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.anneeAcademique.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AnneeAcademiqueUpdateComponent,
    resolve: {
      anneeAcademique: AnneeAcademiqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.anneeAcademique.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AnneeAcademiqueUpdateComponent,
    resolve: {
      anneeAcademique: AnneeAcademiqueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.anneeAcademique.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
