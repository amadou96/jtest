import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISemestre, Semestre } from 'app/shared/model/semestre.model';
import { SemestreService } from './semestre.service';
import { IDemande } from 'app/shared/model/demande.model';
import { DemandeService } from 'app/entities/demande/demande.service';

@Component({
  selector: 'jhi-semestre-update',
  templateUrl: './semestre-update.component.html',
})
export class SemestreUpdateComponent implements OnInit {
  isSaving = false;
  demandes: IDemande[] = [];

  editForm = this.fb.group({
    id: [],
    intitule: [],
    demande: [],
  });

  constructor(
    protected semestreService: SemestreService,
    protected demandeService: DemandeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ semestre }) => {
      this.updateForm(semestre);

      this.demandeService.query().subscribe((res: HttpResponse<IDemande[]>) => (this.demandes = res.body || []));
    });
  }

  updateForm(semestre: ISemestre): void {
    this.editForm.patchValue({
      id: semestre.id,
      intitule: semestre.intitule,
      demande: semestre.demande,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const semestre = this.createFromForm();
    if (semestre.id !== undefined) {
      this.subscribeToSaveResponse(this.semestreService.update(semestre));
    } else {
      this.subscribeToSaveResponse(this.semestreService.create(semestre));
    }
  }

  private createFromForm(): ISemestre {
    return {
      ...new Semestre(),
      id: this.editForm.get(['id'])!.value,
      intitule: this.editForm.get(['intitule'])!.value,
      demande: this.editForm.get(['demande'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISemestre>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IDemande): any {
    return item.id;
  }
}
