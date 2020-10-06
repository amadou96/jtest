import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jtest5SharedModule } from 'app/shared/shared.module';
import { AnneeAcademiqueComponent } from './annee-academique.component';
import { AnneeAcademiqueDetailComponent } from './annee-academique-detail.component';
import { AnneeAcademiqueUpdateComponent } from './annee-academique-update.component';
import { AnneeAcademiqueDeleteDialogComponent } from './annee-academique-delete-dialog.component';
import { anneeAcademiqueRoute } from './annee-academique.route';

@NgModule({
  imports: [Jtest5SharedModule, RouterModule.forChild(anneeAcademiqueRoute)],
  declarations: [
    AnneeAcademiqueComponent,
    AnneeAcademiqueDetailComponent,
    AnneeAcademiqueUpdateComponent,
    AnneeAcademiqueDeleteDialogComponent,
  ],
  entryComponents: [AnneeAcademiqueDeleteDialogComponent],
})
export class Jtest5AnneeAcademiqueModule {}
