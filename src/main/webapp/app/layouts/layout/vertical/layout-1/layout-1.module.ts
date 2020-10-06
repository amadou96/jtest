import { FuseSidebarModule } from './../../../../../@fuse/components/sidebar/sidebar.module';
import { FuseSharedModule } from './../../../../../@fuse/shared.module';
import { VerticalLayout1Component } from './layout-1.component';
import { ToolbarModule } from './../../components/toolbar/toolbar.module';
import { QuickPanelModule } from './../../components/quick-panel/quick-panel.module';
import { NavbarModule } from './../../components/navbar/navbar.module';
import { FooterModule } from './../../components/footer/footer.module';
import { ContentModule } from './../../components/content/content.module';



 import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        VerticalLayout1Component
    ],
    imports     : [
        RouterModule,

        FuseSharedModule,
        FuseSidebarModule,

        ContentModule,
        FooterModule,
        NavbarModule,
        QuickPanelModule,
        ToolbarModule
    ],
    exports     : [
        VerticalLayout1Component
    ]
})
export class VerticalLayout1Module
{
}
