import { Component, Directive, Input, Output, OnInit, OnChanges, OnDestroy, EventEmitter, ElementRef, HostBinding, ContentChild, ViewChild, Optional, Inject, forwardRef } from '@angular/core';
import { Http, Response } from '@angular/http';


import {
    NgModel, ControlValueAccessor, FormControl,
    NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS
} from '@angular/forms';


export interface IEntry {
    label: string, value: any
}

@Component({
    selector: 'input-select-remote',
    templateUrl: 'view.html',
    styleUrls: ['style.scss'],
    host: {
        '(document:click)': 'onDocumentClick($event)'
    },
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputSelectRemoteComponent), multi: true }
    ]
})
export class InputSelectRemoteComponent implements ControlValueAccessor, OnInit {

    @Input() public icon: string;
    @Input() public label: string;
    @Input() public placeholder: string;
    @Input() public limit: number = 6;
    @Input('disabled') public isDisabled: boolean;

    @ContentChild(NgModel) _control: NgModel;



    @Input('remote-url') remoteUrl: string

    get control() : NgModel {
        return this._control || <any>{}
    }

    constructor(private http: Http, private _elRef: ElementRef) {

    }

    onDocumentClick(ev) {
        if (!this._elRef.nativeElement.contains(ev.target)) {
            this.isOpen = false;
            this.onTouched();
        }
    }

    _items: IEntry[] = [];
    get items() {
        return Array.isArray(this._items) && this._items || [];
    }
    _errorMessage: any = '';

    load() {
        if(this.remoteUrl){
            this.http.get(this.remoteUrl, {
                params: {
                    search: this.search,
                    limit: this.limit
                }
            })
                .toPromise()
                .then((res: Response) => {
                    if (res instanceof Response) {
                        if (res.status === 200) {
                            this._items = res.json();
                            return;
                        }
                        throw res;
                    }
                })
                .catch(err => {
                    this._errorMessage = err;
                })
        }
        
    }



    isOpen = false
    toggleDetail() {

        this.isOpen = this.isOpen ? false : true;
        if (this.isOpen) {
            this.load();
        }
    }

    onChange = (_: any) => { };
    onTouched = () => { };

    private _value: IEntry = null;

    get value() {
        return this._value;
    }
    set value(v: IEntry) {        
        if (v) {
            if (this._value) {
                if (this._value.value !== v.value) {
                    this._value = v;
                    this.onChange(v);
                }
            } else {
                this._value = v;
                this.onChange(v);
            }            
        } else {
            if(this._value !== null){
                this._value = null;
                this.onChange(null);
            }
        }
    }

    onSearchChange: EventEmitter<string>

    private _search: string = ''
    get search() {
        return this._search;
    }
    set search(v: any) {
        if (this._search !== v) {
            this._search = v;
            this.onSearchChange.emit(this._search);
        }
    }

    ngOnInit() {
        this.onSearchChange = new EventEmitter<string>();
        this.onSearchChange
            .subscribe(() => {
                this.load();
            })
    }

    clear() {
        this.value = null;
        this.isOpen = false;
    }
    writeValue(v: any): void {
        this.value = v;
    }
    setValue(v: any): void {
        this.value = v;

        this.isOpen = false;
    }

    // valueOfLabel = '';
    // refreshValueOfLabel() {
    //     for (let i = 0; i < this.items.length; i++) {
    //         if (this.items[i].value === this.value) {
    //             return this.valueOfLabel = this.items[i].label;
    //         }
    //     }

    //     this.valueOfLabel = '';
    // }

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }
}