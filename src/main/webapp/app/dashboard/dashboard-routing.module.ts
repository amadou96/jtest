import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from './../core/auth/user-route-access-service';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jtest5App.dashboard.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
