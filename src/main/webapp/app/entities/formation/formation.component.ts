import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFormation } from 'app/shared/model/formation.model';
import { FormationService } from './formation.service';
import { FormationDeleteDialogComponent } from './formation-delete-dialog.component';

@Component({
  selector: 'jhi-formation',
  templateUrl: './formation.component.html',
})
export class FormationComponent implements OnInit, OnDestroy {
  formations?: IFormation[];
  eventSubscriber?: Subscription;

  constructor(protected formationService: FormationService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.formationService.query().subscribe((res: HttpResponse<IFormation[]>) => (this.formations = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFormations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFormation): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFormations(): void {
    this.eventSubscriber = this.eventManager.subscribe('formationListModification', () => this.loadAll());
  }

  delete(formation: IFormation): void {
    const modalRef = this.modalService.open(FormationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.formation = formation;
  }
}
