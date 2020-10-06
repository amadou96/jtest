import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Jtest5TestModule } from '../../../test.module';
import { RpUpdateComponent } from 'app/entities/rp/rp-update.component';
import { RpService } from 'app/entities/rp/rp.service';
import { Rp } from 'app/shared/model/rp.model';

describe('Component Tests', () => {
  describe('Rp Management Update Component', () => {
    let comp: RpUpdateComponent;
    let fixture: ComponentFixture<RpUpdateComponent>;
    let service: RpService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jtest5TestModule],
        declarations: [RpUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RpUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RpUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RpService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Rp(123);
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
        const entity = new Rp();
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
