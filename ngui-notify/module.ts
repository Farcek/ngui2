import { NgModule, } from '@angular/core';
import { CommonModule , } from '@angular/common';



import { NotifyComponent } from './component';
import { NotifyService } from './service';

@NgModule({
    imports: [
        CommonModule, 
    ],
    declarations: [
        NotifyComponent,
    ],
    exports: [
        NotifyComponent, 
    ],
    providers : [
        NotifyService
    ]
})
export class NotifyModule { }