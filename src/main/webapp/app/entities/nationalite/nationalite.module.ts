import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jtest5SharedModule } from 'app/shared/shared.module';
import { NationaliteComponent } from './nationalite.component';
import { NationaliteDetailComponent } from './nationalite-detail.component';
import { NationaliteUpdateComponent } from './nationalite-update.component';
import { NationaliteDeleteDialogComponent } from './nationalite-delete-dialog.component';
import { nationaliteRoute } from './nationalite.route';

@NgModule({
  imports: [Jtest5SharedModule, RouterModule.forChild(nationaliteRoute)],
  declarations: [NationaliteComponent, NationaliteDetailComponent, NationaliteUpdateComponent, NationaliteDeleteDialogComponent],
  entryComponents: [NationaliteDeleteDialogComponent],
})
export class Jtest5NationaliteModule {}
