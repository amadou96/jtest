import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jtest5SharedModule } from 'app/shared/shared.module';
import { RpComponent } from './rp.component';
import { RpDetailComponent } from './rp-detail.component';
import { RpUpdateComponent } from './rp-update.component';
import { RpDeleteDialogComponent } from './rp-delete-dialog.component';
import { rpRoute } from './rp.route';

@NgModule({
  imports: [Jtest5SharedModule, RouterModule.forChild(rpRoute)],
  declarations: [RpComponent, RpDetailComponent, RpUpdateComponent, RpDeleteDialogComponent],
  entryComponents: [RpDeleteDialogComponent],
})
export class Jtest5RpModule {}
