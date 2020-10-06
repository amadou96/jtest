import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRp, Rp } from 'app/shared/model/rp.model';
import { RpService } from './rp.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-rp-update',
  templateUrl: './rp-update.component.html',
})
export class RpUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    prenom: [],
    matricule: [null, [Validators.required]],
    user: [null, Validators.required],
  });

  constructor(
    protected rpService: RpService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rp }) => {
      this.updateForm(rp);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(rp: IRp): void {
    this.editForm.patchValue({
      id: rp.id,
      nom: rp.nom,
      prenom: rp.prenom,
      matricule: rp.matricule,
      user: rp.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rp = this.createFromForm();
    if (rp.id !== undefined) {
      this.subscribeToSaveResponse(this.rpService.update(rp));
    } else {
      this.subscribeToSaveResponse(this.rpService.create(rp));
    }
  }

  private createFromForm(): IRp {
    return {
      ...new Rp(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      matricule: this.editForm.get(['matricule'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRp>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
