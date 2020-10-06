import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMembre, Membre } from 'app/shared/model/membre.model';
import { MembreService } from './membre.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IDepartement } from 'app/shared/model/departement.model';
import { DepartementService } from 'app/entities/departement/departement.service';

type SelectableEntity = IUser | IDepartement;

@Component({
  selector: 'jhi-membre-update',
  templateUrl: './membre-update.component.html',
})
export class MembreUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  departements: IDepartement[] = [];
  dateNaissanceDp: any;
  lieuNaissanceDp: any;

  editForm = this.fb.group({
    id: [],
    matricule: [null, [Validators.required]],
    dateNaissance: [],
    lieuNaissance: [],
    user: [null, Validators.required],
    departement: [null, Validators.required],
  });

  constructor(
    protected membreService: MembreService,
    protected userService: UserService,
    protected departementService: DepartementService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ membre }) => {
      this.updateForm(membre);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.departementService.query().subscribe((res: HttpResponse<IDepartement[]>) => (this.departements = res.body || []));
    });
  }

  updateForm(membre: IMembre): void {
    this.editForm.patchValue({
      id: membre.id,
      matricule: membre.matricule,
      dateNaissance: membre.dateNaissance,
      lieuNaissance: membre.lieuNaissance,
      user: membre.user,
      departement: membre.departement,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const membre = this.createFromForm();
    if (membre.id !== undefined) {
      this.subscribeToSaveResponse(this.membreService.update(membre));
    } else {
      this.subscribeToSaveResponse(this.membreService.create(membre));
    }
  }

  private createFromForm(): IMembre {
    return {
      ...new Membre(),
      id: this.editForm.get(['id'])!.value,
      matricule: this.editForm.get(['matricule'])!.value,
      dateNaissance: this.editForm.get(['dateNaissance'])!.value,
      lieuNaissance: this.editForm.get(['lieuNaissance'])!.value,
      user: this.editForm.get(['user'])!.value,
      departement: this.editForm.get(['departement'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMembre>>): void {
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
