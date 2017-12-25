import { Component, Directive, Input, Output, OnInit, OnDestroy, EventEmitter, ElementRef, HostListener, HostBinding } from '@angular/core';


@Component({
    selector: '[ngui=paging]',    
    templateUrl: 'view.html'
})
export class PaginationComponent {

    @Input('paging-page') private _page: number = 1;
    @Input('paging-total') private _total: number;
    @Input('paging-max') private _max: number = 8;
    @Input('paging-limit') private _limit: number = 10;
    @Output('paging-on-change-page') onChance = new EventEmitter();


    setPage(page: number) {
        this._page = page;
        this.onChance.emit(page);
    }

    next() {
        if (this.hasNext) {
            this.setPage(this.page + 1)
        }
    }

    prev() {
        if (this.hasPrev) {
            this.setPage(this.page - 1)
        }
    }

    ngOnInit() {

    }

    get page() {
        return this._page;
    }

    get maxPage() {
        return this._max || 10;
    }

    get limit() {
        return this._limit || 10;
    }

    get totalPage() {
        var limit = this.limit;
        
        return (limit && Math.ceil(this._total / limit)) || 0;
    }

    get startPage() {
        let pr = Math.round(this.maxPage / 2);
        var p = this.page - pr;
        return p < 1 ? 1 : p;
    }
    get endPage() {
        var pr = Math.round(this.maxPage / 2), t = this.totalPage;
        var p = this.page + pr;
        return p > t ? t : p;
    }

    get pages() {
        var r = [];
        for (var i = this.startPage; i <= this.endPage; i++) {
            r.push(i);
        }
        return r;
    }

    get hasFirst() {
        return this.startPage > 1;
    }
    get hasFirstRange() {
        return this.startPage > 2;
    }
    get hasLast() {
        return this.endPage < this.totalPage;
    }
    get hasLastRange() {
        return this.endPage < this.totalPage - 1;
    }

    get hasNext() {
        return this.page < this.totalPage
    }
    get hasPrev() {

        return this.page > 1
    }

    get spy() {
        return 'total>' + this._total + typeof (this._total) + 'page>' + this._page + typeof (this._page)
    }



}