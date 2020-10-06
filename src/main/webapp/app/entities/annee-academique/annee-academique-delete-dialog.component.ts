import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAnneeAcademique } from 'app/shared/model/annee-academique.model';
import { AnneeAcademiqueService } from './annee-academique.service';

@Component({
  templateUrl: './annee-academique-delete-dialog.component.html',
})
export class AnneeAcademiqueDeleteDialogComponent {
  anneeAcademique?: IAnneeAcademique;

  constructor(
    protected anneeAcademiqueService: AnneeAcademiqueService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.anneeAcademiqueService.delete(id).subscribe(() => {
      this.eventManager.broadcast('anneeAcademiqueListModification');
      this.activeModal.close();
    });
  }
}
