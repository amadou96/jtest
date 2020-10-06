import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Jtest5TestModule } from '../../../test.module';
import { NiveauDetailComponent } from 'app/entities/niveau/niveau-detail.component';
import { Niveau } from 'app/shared/model/niveau.model';

describe('Component Tests', () => {
  describe('Niveau Management Detail Component', () => {
    let comp: NiveauDetailComponent;
    let fixture: ComponentFixture<NiveauDetailComponent>;
    const route = ({ data: of({ niveau: new Niveau(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jtest5TestModule],
        declarations: [NiveauDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NiveauDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NiveauDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load niveau on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.niveau).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
