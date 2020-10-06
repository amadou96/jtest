import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Jtest5TestModule } from '../../../test.module';
import { AnneeAcademiqueComponent } from 'app/entities/annee-academique/annee-academique.component';
import { AnneeAcademiqueService } from 'app/entities/annee-academique/annee-academique.service';
import { AnneeAcademique } from 'app/shared/model/annee-academique.model';

describe('Component Tests', () => {
  describe('AnneeAcademique Management Component', () => {
    let comp: AnneeAcademiqueComponent;
    let fixture: ComponentFixture<AnneeAcademiqueComponent>;
    let service: AnneeAcademiqueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Jtest5TestModule],
        declarations: [AnneeAcademiqueComponent],
      })
        .overrideTemplate(AnneeAcademiqueComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnneeAcademiqueComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnneeAcademiqueService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AnneeAcademique(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.anneeAcademiques && comp.anneeAcademiques[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
