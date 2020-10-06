import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRp } from 'app/shared/model/rp.model';
import { RpService } from './rp.service';
import { RpDeleteDialogComponent } from './rp-delete-dialog.component';

@Component({
  selector: 'jhi-rp',
  templateUrl: './rp.component.html',
})
export class RpComponent implements OnInit, OnDestroy {
  rps?: IRp[];
  eventSubscriber?: Subscription;

  constructor(protected rpService: RpService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.rpService.query().subscribe((res: HttpResponse<IRp[]>) => (this.rps = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRps();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRp): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRps(): void {
    this.eventSubscriber = this.eventManager.subscribe('rpListModification', () => this.loadAll());
  }

  delete(rp: IRp): void {
    const modalRef = this.modalService.open(RpDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rp = rp;
  }
}
