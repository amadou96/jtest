import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IInscription, Inscription } from 'app/shared/model/inscription.model';
import { InscriptionService } from './inscription.service';
import { INiveau } from 'app/shared/model/niveau.model';
import { NiveauService } from 'app/entities/niveau/niveau.service';
import { IAnneeAcademique } from 'app/shared/model/annee-academique.model';
import { AnneeAcademiqueService } from 'app/entities/annee-academique/annee-academique.service';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/etudiant.service';
import { IClasse } from 'app/shared/model/classe.model';
import { ClasseService } from 'app/entities/classe/classe.service';

type SelectableEntity = INiveau | IAnneeAcademique | IEtudiant | IClasse;

@Component({
  selector: 'jhi-inscription-update',
  templateUrl: './inscription-update.component.html',
})
export class InscriptionUpdateComponent implements OnInit {
  isSaving = false;
  niveauins: INiveau[] = [];
  anneeacademiques: IAnneeAcademique[] = [];
  etudiants: IEtudiant[] = [];
  classes: IClasse[] = [];
  dateInscriptionDp: any;

  editForm = this.fb.group({
    id: [],
    dateInscription: [],
    niveauIns: [],
    anneeAcademique: [],
    etudiant: [],
    classe: [null, Validators.required],
  });

  constructor(
    protected inscriptionService: InscriptionService,
    protected niveauService: NiveauService,
    protected anneeAcademiqueService: AnneeAcademiqueService,
    protected etudiantService: EtudiantService,
    protected classeService: ClasseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscription }) => {
      this.updateForm(inscription);

      this.niveauService
        .query({ filter: 'inscription-is-null' })
        .pipe(
          map((res: HttpResponse<INiveau[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: INiveau[]) => {
          if (!inscription.niveauIns || !inscription.niveauIns.id) {
            this.niveauins = resBody;
          } else {
            this.niveauService
              .find(inscription.niveauIns.id)
              .pipe(
                map((subRes: HttpResponse<INiveau>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: INiveau[]) => (this.niveauins = concatRes));
          }
        });

      this.anneeAcademiqueService.query().subscribe((res: HttpResponse<IAnneeAcademique[]>) => (this.anneeacademiques = res.body || []));

      this.etudiantService.query().subscribe((res: HttpResponse<IEtudiant[]>) => (this.etudiants = res.body || []));

      this.classeService.query().subscribe((res: HttpResponse<IClasse[]>) => (this.classes = res.body || []));
    });
  }

  updateForm(inscription: IInscription): void {
    this.editForm.patchValue({
      id: inscription.id,
      dateInscription: inscription.dateInscription,
      niveauIns: inscription.niveauIns,
      anneeAcademique: inscription.anneeAcademique,
      etudiant: inscription.etudiant,
      classe: inscription.classe,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inscription = this.createFromForm();
    if (inscription.id !== undefined) {
      this.subscribeToSaveResponse(this.inscriptionService.update(inscription));
    } else {
      this.subscribeToSaveResponse(this.inscriptionService.create(inscription));
    }
  }

  private createFromForm(): IInscription {
    return {
      ...new Inscription(),
      id: this.editForm.get(['id'])!.value,
      dateInscription: this.editForm.get(['dateInscription'])!.value,
      niveauIns: this.editForm.get(['niveauIns'])!.value,
      anneeAcademique: this.editForm.get(['anneeAcademique'])!.value,
      etudiant: this.editForm.get(['etudiant'])!.value,
      classe: this.editForm.get(['classe'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInscription>>): void {
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
}
