import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Jtest5SharedModule } from 'app/shared/shared.module';
import { MembreComponent } from './membre.component';
import { MembreDetailComponent } from './membre-detail.component';
import { MembreUpdateComponent } from './membre-update.component';
import { MembreDeleteDialogComponent } from './membre-delete-dialog.component';
import { membreRoute } from './membre.route';

@NgModule({
  imports: [Jtest5SharedModule, RouterModule.forChild(membreRoute)],
  declarations: [MembreComponent, MembreDetailComponent, MembreUpdateComponent, MembreDeleteDialogComponent],
  entryComponents: [MembreDeleteDialogComponent],
})
export class Jtest5MembreModule {}
