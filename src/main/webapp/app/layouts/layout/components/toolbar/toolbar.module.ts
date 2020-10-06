import { FuseShortcutsModule } from './../../../../../@fuse/components/shortcuts/shortcuts.module';
import { FuseSearchBarModule } from './../../../../../@fuse/components/search-bar/search-bar.module';
import { FuseSharedModule } from './../../../../../@fuse/shared.module';
import { ToolbarComponent } from './toolbar.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';






@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
