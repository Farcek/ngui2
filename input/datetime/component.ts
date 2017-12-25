import { Component, Directive, Input, Output, OnInit, OnChanges, OnDestroy, EventEmitter, ElementRef, HostBinding, ContentChild, ViewChild, Optional, Inject, forwardRef } from '@angular/core';


import {
    NgModel, ControlValueAccessor, FormControl,
    NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS
} from '@angular/forms';


@Component({
    selector: 'input-datetime',
    templateUrl: 'view.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputDatetimeComponent), multi: true }
    ]
})
export class InputDatetimeComponent implements ControlValueAccessor {
    @Input() public icon: string;
    @Input() public label: string;
    @Input() public placeholder: string;
    @Input('disabled') public isDisabled: boolean;

    @ContentChild(NgModel) _control: NgModel;

    get control() : NgModel {
        return this._control || <any>{}
    }


    onChange = (_: any) => { };
    onTouched = () => { };

    private _value: any;

    get value() {
        return this._value;
    }

    setValue(v: any) {
        if (v) {
            let dv = new Date(v);
            if (this._value !== dv) {
                this._value = dv;
                this.onChange(this._value);
            }

        } else {
            if (this._value !== null) {
                this._value = null;
                this.onChange(this._value);
            }
        }
    }

    constructor(

    ) { }






    writeValue(v: any): void {
        this._value = v;
    }
    /**
     * Set the function to be called when the control receives a change event.
     */
    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }

    /**
     * This function is called when the control status changes to or from "DISABLED".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }
}

