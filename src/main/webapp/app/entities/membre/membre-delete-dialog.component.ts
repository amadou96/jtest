import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMembre } from 'app/shared/model/membre.model';
import { MembreService } from './membre.service';

@Component({
  templateUrl: './membre-delete-dialog.component.html',
})
export class MembreDeleteDialogComponent {
  membre?: IMembre;

  constructor(protected membreService: MembreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.membreService.delete(id).subscribe(() => {
      this.eventManager.broadcast('membreListModification');
      this.activeModal.close();
    });
  }
}
