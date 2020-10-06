import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAnneeAcademique } from 'app/shared/model/annee-academique.model';
import { AnneeAcademiqueService } from './annee-academique.service';
import { AnneeAcademiqueDeleteDialogComponent } from './annee-academique-delete-dialog.component';

@Component({
  selector: 'jhi-annee-academique',
  templateUrl: './annee-academique.component.html',
})
export class AnneeAcademiqueComponent implements OnInit, OnDestroy {
  anneeAcademiques?: IAnneeAcademique[];
  eventSubscriber?: Subscription;

  constructor(
    protected anneeAcademiqueService: AnneeAcademiqueService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.anneeAcademiqueService.query().subscribe((res: HttpResponse<IAnneeAcademique[]>) => (this.anneeAcademiques = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAnneeAcademiques();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAnneeAcademique): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAnneeAcademiques(): void {
    this.eventSubscriber = this.eventManager.subscribe('anneeAcademiqueListModification', () => this.loadAll());
  }

  delete(anneeAcademique: IAnneeAcademique): void {
    const modalRef = this.modalService.open(AnneeAcademiqueDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.anneeAcademique = anneeAcademique;
  }
}
