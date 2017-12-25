import { Component, Directive, Input, Output, OnInit, OnDestroy, EventEmitter, ElementRef, HostListener, HostBinding } from '@angular/core';
import * as service from './service';

@Component({
    selector: '[ngui=notify]',
    templateUrl: 'view.html',
    styleUrls: ['notify.scss']
})
export class NotifyComponent {

    constructor(private service: service.NotifyService) {

    }

    get messages() {
        return this.service.messages;
    }

    remove(id: number) {
        this.service.remove(id);
    }

    pause(id:number){
        this.service.timeoutClear(id);
    }

    resume(id:number){
        this.service.timeoutStart(id);
    }

}
