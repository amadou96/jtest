import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRp } from 'app/shared/model/rp.model';

@Component({
  selector: 'jhi-rp-detail',
  templateUrl: './rp-detail.component.html',
})
export class RpDetailComponent implements OnInit {
  rp: IRp | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rp }) => (this.rp = rp));
  }

  previousState(): void {
    window.history.back();
  }
}
