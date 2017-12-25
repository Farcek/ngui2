import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputStringComponent } from './string/component'
import { InputPasswordComponent } from './password/component'
import { InputTextComponent } from './text/component'
import { InputNumberComponent } from './number/component'
import { InputSelectComponent } from './select/component'
import { InputSelectRemoteComponent } from './select-remote/component'
import { InputDatetimeComponent } from './datetime/component'


@NgModule({
    imports: [
        CommonModule, FormsModule
    ],
    declarations: [
        InputStringComponent, InputPasswordComponent,
        InputSelectComponent, InputTextComponent, InputNumberComponent, InputSelectRemoteComponent, InputDatetimeComponent
    ],
    exports: [
        InputStringComponent, InputPasswordComponent,
        InputSelectComponent, InputTextComponent, InputNumberComponent, InputSelectRemoteComponent, InputDatetimeComponent
    ],
    providers: []
})
export class InputModule { } 