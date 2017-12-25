import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmComponent } from './component';
import { ConfirmService } from './service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ConfirmComponent
    ],
    exports: [
        ConfirmComponent
    ],
    providers: [
        ConfirmService
    ]
})
export class ConfirmModule { }