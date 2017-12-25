import { EventEmitter } from '@angular/core';

export interface IOrder {
    field?: string
    flag?: string
}
export interface IPaging {
    total?: number
    page?: number
    limit?: number
    max?: number
}

export interface IFilter {
    query?: string
}

export interface IOnChange {
    flag: string
    paging?: IPaging
    order?: IOrder

    filter?: IFilter
}

export interface IOption {
    paging?: IPaging
    order?: IOrder

    filter?: IFilter
    
}
export interface IState {
    limit?: number
    page?: number
    filter?: string
    orderfield?: string
    orderflag?: string
}

export class Datatable<T> {
    private _order: IOrder = null;
    private _paging: IPaging = null;
    private _filter: IFilter = null;

    /**
     * on change states
     */
    onChance = new EventEmitter<IOnChange>();

    /**
     * selection change
     */
    onSelect = new EventEmitter<T>();

    constructor(option?: IOption) {
        this._order = (option && option.order) || {};
        this._order.flag = this._order.flag || 'asc';

        this._filter = (option && option.filter) || {};
        this._paging = (option && option.paging) || { page: 1 };
    }

    fireOnChange(flag: string) {
        let options: IOnChange = {
            flag,
            order: this.order,
            filter: this.filter,
            paging: this.paging
        }
        this.onChance.emit(options);
    }

    private _items: T[] = [];
    setItems(items: T[]) {
        this._items = items;
    }
    get items() {
        return this._items;
    }

    // paging
    get paging() {
        return this._paging
    }
    pagingTotal(total: number) {
        this._paging.total = total;
    }
    pagingPage(page: number) {
        this._paging.page = page;
        this.fireOnChange('paging')
    }

    get states() {
        return {
            limit: this._paging && this._paging.limit,
            page: this._paging && this._paging.page,
            filter: this._filter && this._filter.query,
            orderfield: this._order && this._order.field,
            orderflag: this._order && this._order.flag,
        }
    }

    // filter
    get filter() {
        return this._filter
    }
    filterQuery(query: string) {
        this._filter.query = query;
        this.fireOnChange('filter')
    }
    // order 
    get order() {
        return this._order;
    }
    getOrder(field: string) {
        if (this.order && this.order.field == field) {
            return this.order.flag;
        }
        return null;
    }

    setOrder(field: string, flag?: string) {

        if (this.order.field == field) {
            if (flag) {
                this.order.flag = flag;
            } else {

                if (this.order.flag === null) {
                    this.order.flag = "asc";
                } else if (this.order.flag === 'asc') {
                    this.order.flag = "desc";
                } else if (this.order.flag === 'desc') {
                    this.order.flag = null;
                } else {
                    this.order.flag = 'asc';
                }
            }
        } else {
            this.order.field = field;
            this.order.flag = flag || 'asc';
        }

        this.fireOnChange('order')
    }

    //select
    private _select: T = null
    get selected() {
        return this._select;
    }

    set selected(item: T) {
        this._select = item
        this.onSelect.emit(item);
    }

    get test() {
        return {
            order: this.order,
            paging: this.paging,
            filter: this.filter
        }
    }

}
