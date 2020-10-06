import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDemande } from 'app/shared/model/demande.model';
import { DemandeService } from './demande.service';

@Component({
  templateUrl: './demande-delete-dialog.component.html',
})
export class DemandeDeleteDialogComponent {
  demande?: IDemande;

  constructor(protected demandeService: DemandeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.demandeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('demandeListModification');
      this.activeModal.close();
    });
  }
}
