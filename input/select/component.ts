import { Component, Directive, Input, Output, OnInit, OnChanges, OnDestroy, EventEmitter, ElementRef, HostBinding, ContentChild, ViewChild, Optional, Inject, forwardRef } from '@angular/core';


import {
    NgModel, ControlValueAccessor, FormControl,
    NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS
} from '@angular/forms';


export interface ISelectOptions {
    [key: number]: string | { label: string, value: any }
}

@Component({
    selector: 'input-select',
    templateUrl: 'view.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputSelectComponent), multi: true }
    ]
})
export class InputSelectComponent implements ControlValueAccessor {

    @Input() public icon: string;
    @Input() public label: string;
    @Input() public placeholder: string;
    @Input('disabled') public isDisabled: boolean;

    __items: ISelectOptions;

    @Input('options')
    get _items() {
        return this.__items;
    }
    set _items(items: ISelectOptions) {
        this.__items = items;
        this._parsedItems = null;
    }

    @ContentChild(NgModel) _control: NgModel;

    private _parsedItems: any;
    get items() {
        if (this._parsedItems) {
            return this._parsedItems;
        }
        let items = [];
        if (this._items && Array.isArray(this._items)) {
            this._items.forEach((it, idx) => {
                if (it.value && it.label) {
                    items.push({ label: '' + it.label, value: it.value });
                } else {
                    items.push({ label: '' + it, value: idx });
                }
            });
        }
        return this._parsedItems = items;
    }

    get control() : NgModel {
        return this._control || <any>{}
    }

    onChange = (_: any) => { };
    onTouched = () => { };

    private _value: string = null;

    get value() {
        return (this._value === undefined || this._value === null) ? '' : this._value ;
    }
    set value(v: string) {
        if (this._value !== v) {
            this._value = v;
            this.onChange(v);
        }
    }

    clear(){
        this._value = null;
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

