import { Injectable, EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';


@Injectable()
export class ConfirmService {
    items: Ask[] = [];
    openMenu = false
    ask(message: string) {
        return new Promise<boolean>((resolve) => {
            
            let ask = new Ask(message, () => resolve(true), () => resolve(false));
            this.items.push(ask);
        });
    }

    done(id, flag: boolean) {
        let idx = this.items.findIndex((it) => it.id == id);
        this.items.splice(idx, 1).map(it => flag ? it.yes() : it.no());
    }
}

const $$ = {
    id: 1
}
export class Ask {
    id = $$.id++;
    constructor(private message: string, public yes: () => void, public no: () => void) {

    }
}