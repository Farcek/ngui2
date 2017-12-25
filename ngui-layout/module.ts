import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LayoutComponent
    ],
    exports: [
        LayoutComponent
    ]
})
export class LayoutModule { }