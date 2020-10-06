import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Jtest5TestModule } from '../../../test.module';
import { DemandeComponent } from 'app/entities/demande/demande.component';
import { DemandeService } from 'app/entities/demande/demande.service';
import { Demande } from 'app/shared/model/demande.model';

describe('Component Tests', () => {
  describe('Demande Management Component', () => {
    let comp: DemandeComponent;
    let fixture: ComponentFixture<DemandeComponent>;
    let service: DemandeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jtest5TestModule],
        declarations: [DemandeComponent],
      })
        .overrideTemplate(DemandeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DemandeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DemandeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Demande(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.demandes && comp.demandes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
