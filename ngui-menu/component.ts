import { Component, Directive, HostBinding, OnDestroy } from '@angular/core';

import * as service from './service';

@Component({
    selector: '[ngui=menu]',
    templateUrl: 'view.html'
})
export class MenuComponent {
    constructor(private menuService: service.MenuService) {

    }

    get openMenu(){
        return this.menuService.openMenu;
    }
    toggleMenu() {
        this.menuService.toggleMenu();
    }

}


