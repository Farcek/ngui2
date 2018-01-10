import { Component, Directive, Input, Output, OnInit, OnChanges, OnDestroy, EventEmitter, ElementRef, HostBinding, ContentChild, ViewChild, Optional, Inject, forwardRef, Attribute } from '@angular/core';


import {
    NgModel, ControlValueAccessor, NgForm,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

import { IFileServiceToken, IFileService } from './file.service';


@Component({
    selector: 'input-file',
    templateUrl: 'view.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputFileComponent), multi: true }
    ]
})
export class InputFileComponent implements ControlValueAccessor {


    @Input() public label: string;
    @Input('disabled') public isDisabled: boolean;

    private _required: boolean = false
    @Input()
    set required(value: any) {
        this._required = (value != 'false' || value !== false);
    }
    get required() {
        return this._required;
    }




    onChange = (_: any) => { };


    _touched = false;

    onblur() {
        this._touched = true;
        this.onTouched();
    }
    onTouched = () => { };

    private _value: string;

    get value() {
        return this._value;
    }
    set value(v: string) {
        if (this._value !== v) {
            this._value = v;
            this.onChange(v);
        }
    }
    constructor(
        private parantForm: NgForm,
        @Inject(IFileServiceToken) private filrService: IFileService
    ) {

    }

    test() {
        console.log('yyyy')
    }

    get hasState() {
        return this.parantForm && this.parantForm.submitted || this._touched || false;
    }

    get invalid() {
        return !this.valid;
    }

    get valid() {
        if (this._required && this._value) {
            return true;
        }
        return false;

    }

    uploadProcess = 0

    upload(files: Array<File>) {
        this.uploadProcess = 0;
        if (files.length) {
            this.filrService.upload(
                files[0],
                (p: number) => {
                    this.uploadProcess = p;
                },
                (err, value) => {
                    this.value = value;
                }
            );
        } else {
            this.value = null;
        }
    }

    writeValue(v: string): void {
        this.value = v;
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