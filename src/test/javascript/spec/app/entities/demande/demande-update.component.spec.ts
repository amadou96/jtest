import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Jtest5TestModule } from '../../../test.module';
import { DemandeUpdateComponent } from 'app/entities/demande/demande-update.component';
import { DemandeService } from 'app/entities/demande/demande.service';
import { Demande } from 'app/shared/model/demande.model';

describe('Component Tests', () => {
  describe('Demande Management Update Component', () => {
    let comp: DemandeUpdateComponent;
    let fixture: ComponentFixture<DemandeUpdateComponent>;
    let service: DemandeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jtest5TestModule],
        declarations: [DemandeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DemandeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DemandeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DemandeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Demande(123);
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
        const entity = new Demande();
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
