import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { Jtest5SharedModule } from 'app/shared/shared.module';
import { Jtest5CoreModule } from 'app/core/core.module';
import { Jtest5AppRoutingModule } from './app-routing.module';
import { Jtest5HomeModule } from './home/home.module';
import { Jtest5EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { VerticalLayout1Module } from './layouts/layout/vertical/layout-1/layout-1.module';

@NgModule({
  imports: [
    BrowserModule,
    Jtest5SharedModule,
    Jtest5CoreModule,
    Jtest5HomeModule,
    VerticalLayout1Module,
    // jhipster-needle-angular-add-module JHipster will add new module here
    Jtest5EntityModule,
    Jtest5AppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class Jtest5AppModule {}
