import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Jtest5TestModule } from '../../../test.module';
import { RpDetailComponent } from 'app/entities/rp/rp-detail.component';
import { Rp } from 'app/shared/model/rp.model';

describe('Component Tests', () => {
  describe('Rp Management Detail Component', () => {
    let comp: RpDetailComponent;
    let fixture: ComponentFixture<RpDetailComponent>;
    const route = ({ data: of({ rp: new Rp(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jtest5TestModule],
        declarations: [RpDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RpDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RpDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load rp on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rp).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
