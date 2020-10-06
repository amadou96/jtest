import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Jtest5TestModule } from '../../../test.module';
import { RpComponent } from 'app/entities/rp/rp.component';
import { RpService } from 'app/entities/rp/rp.service';
import { Rp } from 'app/shared/model/rp.model';

describe('Component Tests', () => {
  describe('Rp Management Component', () => {
    let comp: RpComponent;
    let fixture: ComponentFixture<RpComponent>;
    let service: RpService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jtest5TestModule],
        declarations: [RpComponent],
      })
        .overrideTemplate(RpComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RpComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RpService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Rp(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rps && comp.rps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
