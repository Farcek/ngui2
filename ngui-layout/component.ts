import { Component, Directive, Input, Output, OnInit, OnDestroy, EventEmitter, ElementRef, HostListener, HostBinding } from '@angular/core';
import { MenuService } from '../ngui-menu/service';


@Component({
    selector: '[ngui=layout]',
    templateUrl: 'view.html'    
})
export class LayoutComponent {

    constructor(private menuService: MenuService) {
        
    }

    toggleMenu() {
        this.menuService.toggleMenu();
    }

}
