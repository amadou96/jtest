import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INiveau } from 'app/shared/model/niveau.model';
import { NiveauService } from './niveau.service';

@Component({
  templateUrl: './niveau-delete-dialog.component.html',
})
export class NiveauDeleteDialogComponent {
  niveau?: INiveau;

  constructor(protected niveauService: NiveauService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.niveauService.delete(id).subscribe(() => {
      this.eventManager.broadcast('niveauListModification');
      this.activeModal.close();
    });
  }
}
