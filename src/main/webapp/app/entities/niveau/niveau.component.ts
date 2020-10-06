import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INiveau } from 'app/shared/model/niveau.model';
import { NiveauService } from './niveau.service';
import { NiveauDeleteDialogComponent } from './niveau-delete-dialog.component';

@Component({
  selector: 'jhi-niveau',
  templateUrl: './niveau.component.html',
})
export class NiveauComponent implements OnInit, OnDestroy {
  niveaus?: INiveau[];
  eventSubscriber?: Subscription;

  constructor(protected niveauService: NiveauService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.niveauService.query().subscribe((res: HttpResponse<INiveau[]>) => (this.niveaus = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNiveaus();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INiveau): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNiveaus(): void {
    this.eventSubscriber = this.eventManager.subscribe('niveauListModification', () => this.loadAll());
  }

  delete(niveau: INiveau): void {
    const modalRef = this.modalService.open(NiveauDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.niveau = niveau;
  }
}
