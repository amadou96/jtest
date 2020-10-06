import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Jtest5TestModule } from '../../../test.module';
import { AnneeAcademiqueUpdateComponent } from 'app/entities/annee-academique/annee-academique-update.component';
import { AnneeAcademiqueService } from 'app/entities/annee-academique/annee-academique.service';
import { AnneeAcademique } from 'app/shared/model/annee-academique.model';

describe('Component Tests', () => {
  describe('AnneeAcademique Management Update Component', () => {
    let comp: AnneeAcademiqueUpdateComponent;
    let fixture: ComponentFixture<AnneeAcademiqueUpdateComponent>;
    let service: AnneeAcademiqueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jtest5TestModule],
        declarations: [AnneeAcademiqueUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AnneeAcademiqueUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnneeAcademiqueUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnneeAcademiqueService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AnneeAcademique(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new AnneeAcademique();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
