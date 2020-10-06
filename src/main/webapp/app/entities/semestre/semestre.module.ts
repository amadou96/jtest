import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jtest5SharedModule } from 'app/shared/shared.module';
import { SemestreComponent } from './semestre.component';
import { SemestreDetailComponent } from './semestre-detail.component';
import { SemestreUpdateComponent } from './semestre-update.component';
import { SemestreDeleteDialogComponent } from './semestre-delete-dialog.component';
import { semestreRoute } from './semestre.route';

@NgModule({
  imports: [Jtest5SharedModule, RouterModule.forChild(semestreRoute)],
  declarations: [SemestreComponent, SemestreDetailComponent, SemestreUpdateComponent, SemestreDeleteDialogComponent],
  entryComponents: [SemestreDeleteDialogComponent],
})
export class Jtest5SemestreModule {}
