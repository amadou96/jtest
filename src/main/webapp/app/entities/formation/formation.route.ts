import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFormation, Formation } from 'app/shared/model/formation.model';
import { FormationService } from './formation.service';
import { FormationComponent } from './formation.component';
import { FormationDetailComponent } from './formation-detail.component';
import { FormationUpdateComponent } from './formation-update.component';

@Injectable({ providedIn: 'root' })
export class FormationResolve implements Resolve<IFormation> {
  constructor(private service: FormationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFormation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((formation: HttpResponse<Formation>) => {
          if (formation.body) {
            return of(formation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Formation());
  }
}

export const formationRoute: Routes = [
  {
    path: '',
    component: FormationComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.formation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FormationDetailComponent,
    resolve: {
      formation: FormationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.formation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FormationUpdateComponent,
    resolve: {
      formation: FormationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.formation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FormationUpdateComponent,
    resolve: {
      formation: FormationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.formation.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
