import { ToolbarModule } from './../../components/toolbar/toolbar.module';
import { QuickPanelModule } from './../../components/quick-panel/quick-panel.module';
import { NavbarModule } from './../../components/navbar/navbar.module';
import { FooterModule } from './../../components/footer/footer.module';
import { ContentModule } from './../../components/content/content.module';
import { FuseSidebarModule } from './../../../../../@fuse/components/sidebar/sidebar.module';
import { FuseSharedModule } from './../../../../../@fuse/shared.module';
import { VerticalLayout3Component } from './layout-3.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        VerticalLayout3Component
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
        VerticalLayout3Component
    ]
})
export class VerticalLayout3Module
{
}
