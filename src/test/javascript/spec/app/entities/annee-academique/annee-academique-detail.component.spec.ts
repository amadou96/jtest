import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Jtest5TestModule } from '../../../test.module';
import { AnneeAcademiqueDetailComponent } from 'app/entities/annee-academique/annee-academique-detail.component';
import { AnneeAcademique } from 'app/shared/model/annee-academique.model';

describe('Component Tests', () => {
  describe('AnneeAcademique Management Detail Component', () => {
    let comp: AnneeAcademiqueDetailComponent;
    let fixture: ComponentFixture<AnneeAcademiqueDetailComponent>;
    const route = ({ data: of({ anneeAcademique: new AnneeAcademique(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jtest5TestModule],
        declarations: [AnneeAcademiqueDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AnneeAcademiqueDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AnneeAcademiqueDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load anneeAcademique on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.anneeAcademique).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
