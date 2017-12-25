import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './component';
import { MenuService } from './service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MenuComponent
    ],
    exports: [
        MenuComponent
    ],
    providers: [
        MenuService
    ]
})
export class MenuModule { }