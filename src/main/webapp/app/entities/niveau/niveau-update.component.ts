import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INiveau, Niveau } from 'app/shared/model/niveau.model';
import { NiveauService } from './niveau.service';
import { IFormation } from 'app/shared/model/formation.model';
import { FormationService } from 'app/entities/formation/formation.service';
import { ISemestre } from 'app/shared/model/semestre.model';
import { SemestreService } from 'app/entities/semestre/semestre.service';

type SelectableEntity = IFormation | ISemestre;

@Component({
  selector: 'jhi-niveau-update',
  templateUrl: './niveau-update.component.html',
})
export class NiveauUpdateComponent implements OnInit {
  isSaving = false;
  formations: IFormation[] = [];
  semestres: ISemestre[] = [];

  editForm = this.fb.group({
    id: [],
    intitule: [],
    formation: [],
    semestres: [],
  });

  constructor(
    protected niveauService: NiveauService,
    protected formationService: FormationService,
    protected semestreService: SemestreService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ niveau }) => {
      this.updateForm(niveau);

      this.formationService.query().subscribe((res: HttpResponse<IFormation[]>) => (this.formations = res.body || []));

      this.semestreService.query().subscribe((res: HttpResponse<ISemestre[]>) => (this.semestres = res.body || []));
    });
  }

  updateForm(niveau: INiveau): void {
    this.editForm.patchValue({
      id: niveau.id,
      intitule: niveau.intitule,
      formation: niveau.formation,
      semestres: niveau.semestres,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const niveau = this.createFromForm();
    if (niveau.id !== undefined) {
      this.subscribeToSaveResponse(this.niveauService.update(niveau));
    } else {
      this.subscribeToSaveResponse(this.niveauService.create(niveau));
    }
  }

  private createFromForm(): INiveau {
    return {
      ...new Niveau(),
      id: this.editForm.get(['id'])!.value,
      intitule: this.editForm.get(['intitule'])!.value,
      formation: this.editForm.get(['formation'])!.value,
      semestres: this.editForm.get(['semestres'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INiveau>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: ISemestre[], option: ISemestre): ISemestre {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
