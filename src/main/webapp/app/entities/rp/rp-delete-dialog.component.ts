import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRp } from 'app/shared/model/rp.model';
import { RpService } from './rp.service';

@Component({
  templateUrl: './rp-delete-dialog.component.html',
})
export class RpDeleteDialogComponent {
  rp?: IRp;

  constructor(protected rpService: RpService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rpService.delete(id).subscribe(() => {
      this.eventManager.broadcast('rpListModification');
      this.activeModal.close();
    });
  }
}
