
import { NgModule } from '@angular/core';
import { NavbarVerticalStyle2Module } from './vertical/style-2/style-2.module';
import { NavbarVerticalStyle1Module } from './vertical/style-1/style-1.module';
import { NavbarComponent } from './../../../navbar/navbar.component';
import { NavbarHorizontalStyle1Module } from './horizontal/style-1/style-1.module';
import { FuseSharedModule } from './../../../../../@fuse/shared.module';





@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports     : [
        FuseSharedModule,

        NavbarHorizontalStyle1Module,
        NavbarVerticalStyle1Module,
        NavbarVerticalStyle2Module,
        FuseSharedModule
    ],
    exports     : [
        NavbarComponent
    ]
})
export class NavbarModule
{
}
