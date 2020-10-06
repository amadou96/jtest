import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEtudiant, Etudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from './etudiant.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { INationalite } from 'app/shared/model/nationalite.model';
import { NationaliteService } from 'app/entities/nationalite/nationalite.service';

type SelectableEntity = IUser | INationalite;

@Component({
  selector: 'jhi-etudiant-update',
  templateUrl: './etudiant-update.component.html',
})
export class EtudiantUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  nationalites: INationalite[] = [];
  dateNaissanceDp: any;

  editForm = this.fb.group({
    id: [],
    nom: [],
    prenom: [],
    dateNaissance: [],
    email: [],
    lieuNaissance: [null, [Validators.required]],
    adresse: [null, [Validators.required]],
    telephone: [null, [Validators.required]],
    ine: [null, [Validators.required]],
    nin: [],
    user: [],
    nationalite: [null, Validators.required],
  });

  constructor(
    protected etudiantService: EtudiantService,
    protected userService: UserService,
    protected nationaliteService: NationaliteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etudiant }) => {
      this.updateForm(etudiant);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.nationaliteService.query().subscribe((res: HttpResponse<INationalite[]>) => (this.nationalites = res.body || []));
    });
  }

  updateForm(etudiant: IEtudiant): void {
    this.editForm.patchValue({
      id: etudiant.id,
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      dateNaissance: etudiant.dateNaissance,
      email: etudiant.email,
      lieuNaissance: etudiant.lieuNaissance,
      adresse: etudiant.adresse,
      telephone: etudiant.telephone,
      ine: etudiant.ine,
      nin: etudiant.nin,
      user: etudiant.user,
      nationalite: etudiant.nationalite,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const etudiant = this.createFromForm();
    if (etudiant.id !== undefined) {
      this.subscribeToSaveResponse(this.etudiantService.update(etudiant));
    } else {
      this.subscribeToSaveResponse(this.etudiantService.create(etudiant));
    }
  }

  private createFromForm(): IEtudiant {
    return {
      ...new Etudiant(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      dateNaissance: this.editForm.get(['dateNaissance'])!.value,
      email: this.editForm.get(['email'])!.value,
      lieuNaissance: this.editForm.get(['lieuNaissance'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      ine: this.editForm.get(['ine'])!.value,
      nin: this.editForm.get(['nin'])!.value,
      user: this.editForm.get(['user'])!.value,
      nationalite: this.editForm.get(['nationalite'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtudiant>>): void {
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
