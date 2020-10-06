import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Jtest5TestModule } from '../../../test.module';
import { NiveauComponent } from 'app/entities/niveau/niveau.component';
import { NiveauService } from 'app/entities/niveau/niveau.service';
import { Niveau } from 'app/shared/model/niveau.model';

describe('Component Tests', () => {
  describe('Niveau Management Component', () => {
    let comp: NiveauComponent;
    let fixture: ComponentFixture<NiveauComponent>;
    let service: NiveauService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jtest5TestModule],
        declarations: [NiveauComponent],
      })
        .overrideTemplate(NiveauComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NiveauComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NiveauService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Niveau(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.niveaus && comp.niveaus[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
