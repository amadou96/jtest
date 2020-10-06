import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFormation } from 'app/shared/model/formation.model';
import { FormationService } from './formation.service';

@Component({
  templateUrl: './formation-delete-dialog.component.html',
})
export class FormationDeleteDialogComponent {
  formation?: IFormation;

  constructor(protected formationService: FormationService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.formationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('formationListModification');
      this.activeModal.close();
    });
  }
}
