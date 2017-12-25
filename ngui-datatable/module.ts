import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControlDirective } from '@angular/forms';

import { PaginationModule } from '../ngui-pagination/module';
import { DatatableComponent } from './component';

@NgModule({
    imports: [
        CommonModule, FormsModule, PaginationModule
    ],
    declarations: [
        DatatableComponent
    ],
    exports: [
        DatatableComponent
    ]
})
export class DatatableModule { }