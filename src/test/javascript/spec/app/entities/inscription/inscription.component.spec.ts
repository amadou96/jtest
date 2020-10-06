import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Jtest5TestModule } from '../../../test.module';
import { InscriptionComponent } from 'app/entities/inscription/inscription.component';
import { InscriptionService } from 'app/entities/inscription/inscription.service';
import { Inscription } from 'app/shared/model/inscription.model';

describe('Component Tests', () => {
  describe('Inscription Management Component', () => {
    let comp: InscriptionComponent;
    let fixture: ComponentFixture<InscriptionComponent>;
    let service: InscriptionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jtest5TestModule],
        declarations: [InscriptionComponent],
      })
        .overrideTemplate(InscriptionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InscriptionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InscriptionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Inscription(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.inscriptions && comp.inscriptions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
