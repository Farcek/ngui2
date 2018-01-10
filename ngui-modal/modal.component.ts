import { Component, Directive, Input, Output, OnInit, OnDestroy, EventEmitter, ElementRef, HostListener, HostBinding } from '@angular/core';


import { ModalController } from './modal.controller';



@Component({
    selector: '[ngui=modal]',
    templateUrl: 'modal.component.html'
})
export class ModalComponent implements OnInit{

    @Input('modal-controller') controller: ModalController;
    @Input('modal-title') title: string;

    ngOnInit() {

    }


    get isOpen(){
        return this.controller.isOpen;
    }

}
