import { Injectable, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';

@Injectable()
export class MenuService {

    constructor(router: Router) {
        router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((event: NavigationStart) => {
                this.openMenu = false;
            });
    }

    openMenu = false
    toggleMenu() {
        this.openMenu = !this.openMenu;
        this.OnMenuToggled.emit(this.openMenu);
    }

    OnMenuToggled = new EventEmitter();
}