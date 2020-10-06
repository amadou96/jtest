import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Jtest5TestModule } from '../../../test.module';
import { DemandeDetailComponent } from 'app/entities/demande/demande-detail.component';
import { Demande } from 'app/shared/model/demande.model';

describe('Component Tests', () => {
  describe('Demande Management Detail Component', () => {
    let comp: DemandeDetailComponent;
    let fixture: ComponentFixture<DemandeDetailComponent>;
    const route = ({ data: of({ demande: new Demande(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jtest5TestModule],
        declarations: [DemandeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DemandeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DemandeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load demande on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.demande).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
