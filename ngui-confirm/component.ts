import { Component, Directive, HostBinding, OnDestroy } from '@angular/core';

import * as service from './service';

@Component({
    selector: '[ngui=confirm]',
    templateUrl: 'view.html'
})
export class ConfirmComponent {
    constructor(private service: service.ConfirmService) {

    }

    get items(){
        return this.service.items || [];
    }

    yes(id) {
        this.service.done(id,true);
    }
    no(id) {
        this.service.done(id,false);
    }
}


