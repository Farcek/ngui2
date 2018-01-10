import { EventEmitter } from '@angular/core';

export class ModalController {

    isOpen = false

    /**
     * on change states
     */
    onOpen = new EventEmitter<any>();

    /**
     * selection change
     */
    onClose = new EventEmitter<any>();

    constructor() {

    }

    open() {
        this.isOpen = true;
    }
    close() {
        this.isOpen = false;
    }

}
