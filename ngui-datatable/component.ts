import { Component, Directive, Input, Output, OnInit, OnDestroy, EventEmitter, ElementRef, HostListener, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms'

import {Datatable,IFilter, IOnChange, IOption, IOrder, IPaging} from './controller';



@Component({
    selector: '[ngui=datatable]',
    templateUrl: 'datatable.html'
})
export class DatatableComponent<T> {

    @Input('datatable-controller') dt: Datatable<T>
    @Input('datatable-title') title: string = "Data list";


    queryControl = new FormControl();
    ngOnInit() {
        this.dt && this.dt.fireOnChange('init');
        this.queryControl.valueChanges
            //.debounceTime(200)
            .subscribe(query => {
                this.dt && this.dt.filterQuery(query);
            });
    }

    // get items() {
    //     return this.dt.items
    // }

    // select(item: T) {
    //     this.dt.select = item;
    // }

    // get selected() {
    //     return this.dt.select;
    // }

    // order
    setOrder(field: string, flag?: string) {
        this.dt.setOrder(field, flag);
    }

    getOrder(field: string) {
        return this.dt.getOrder(field);
    }

    // ------ filter
    setFilter(query) {
        this.dt.filter.query = query;
    }
    get filterQuery() {
        return this.dt.filter.query
    }

    // paging
    get paging() {
        return this.dt.paging
    }
    pagingPage(page) {
        this.dt.pagingPage(page);
    }

    // get test() {
    //     return this.dt.test;
    // }

}
