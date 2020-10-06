import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'demande',
        loadChildren: () => import('./demande/demande.module').then(m => m.Jtest5DemandeModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'etudiant',
        loadChildren: () => import('./etudiant/etudiant.module').then(m => m.Jtest5EtudiantModule),
      },
      {
        path: 'rp',
        loadChildren: () => import('./rp/rp.module').then(m => m.Jtest5RpModule),
      },
      {
        path: 'inscription',
        loadChildren: () => import('./inscription/inscription.module').then(m => m.Jtest5InscriptionModule),
      },
      {
        path: 'classe',
        loadChildren: () => import('./classe/classe.module').then(m => m.Jtest5ClasseModule),
      },
      {
        path: 'annee-academique',
        loadChildren: () => import('./annee-academique/annee-academique.module').then(m => m.Jtest5AnneeAcademiqueModule),
      },
      {
        path: 'departement',
        loadChildren: () => import('./departement/departement.module').then(m => m.Jtest5DepartementModule),
      },
      {
        path: 'formation',
        loadChildren: () => import('./formation/formation.module').then(m => m.Jtest5FormationModule),
      },
      {
        path: 'niveau',
        loadChildren: () => import('./niveau/niveau.module').then(m => m.Jtest5NiveauModule),
      },
      {
        path: 'semestre',
        loadChildren: () => import('./semestre/semestre.module').then(m => m.Jtest5SemestreModule),
      },
      {
        path: 'nationalite',
        loadChildren: () => import('./nationalite/nationalite.module').then(m => m.Jtest5NationaliteModule),
      },
      {
        path: 'membre',
        loadChildren: () => import('./membre/membre.module').then(m => m.Jtest5MembreModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class Jtest5EntityModule {}
