import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAnneeAcademique, AnneeAcademique } from 'app/shared/model/annee-academique.model';
import { AnneeAcademiqueService } from './annee-academique.service';

@Component({
  selector: 'jhi-annee-academique-update',
  templateUrl: './annee-academique-update.component.html',
})
export class AnneeAcademiqueUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    intitule: [],
  });

  constructor(
    protected anneeAcademiqueService: AnneeAcademiqueService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ anneeAcademique }) => {
      this.updateForm(anneeAcademique);
    });
  }

  updateForm(anneeAcademique: IAnneeAcademique): void {
    this.editForm.patchValue({
      id: anneeAcademique.id,
      intitule: anneeAcademique.intitule,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const anneeAcademique = this.createFromForm();
    if (anneeAcademique.id !== undefined) {
      this.subscribeToSaveResponse(this.anneeAcademiqueService.update(anneeAcademique));
    } else {
      this.subscribeToSaveResponse(this.anneeAcademiqueService.create(anneeAcademique));
    }
  }

  private createFromForm(): IAnneeAcademique {
    return {
      ...new AnneeAcademique(),
      id: this.editForm.get(['id'])!.value,
      intitule: this.editForm.get(['intitule'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnneeAcademique>>): void {
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
}
