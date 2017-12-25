import { Injectable, EventEmitter } from '@angular/core';


export enum NotifyType {
    Normal = 0,
    Dark = 1,
    Primary = 2,
    Info = 3,
    Success = 4,
    Warning = 5,
    Danger = 6
}

export interface INotify {
    type?: NotifyType
    timeout?: number //sec
    title: string
    message: string
}

interface ILocalMessage extends INotify {
    __timer__: any
    __id__: number
}

@Injectable()
export class NotifyService {
    private _messages: ILocalMessage[] = [];

    public get messages(): INotify[] {
        return this._messages;
    }
    private __i = 0;

    show(message: INotify) {
        return ((id: number, message: INotify) => {

            let item: ILocalMessage = {
                __id__: id,
                __timer__: setTimeout(() => {
                    this.remove(id);
                }, message.timeout || 3000),
                message: message.message,
                title: message.title,
                type: message.type || NotifyType.Normal
            };
            this._messages.push(item);
            return id;
        })(this.__i++, message);
    }


    remove(id: number) {
        var idx = -1;
        this._messages.map((it, index) => {
            if (it.__id__ === id) {
                idx = index;
            }
        });

        if (idx > -1) {
            this._messages
                .splice(idx, 1)
                .map(item => {
                    item.__timer__ && clearTimeout(item.__timer__);
                });
        }
    }
    timeoutClear(id: number) {
        this._messages
            .filter((it, index) => it.__id__ === id)
            .map(item => {
                item.__timer__ && clearTimeout(item.__timer__);
            });
    }
    timeoutStart(id: number) {
        this._messages
            .filter((it, index) => it.__id__ === id)
            .map(item => {
                item.__timer__ && clearTimeout(item.__timer__);
                item.__timer__ = setTimeout(() => {
                    this.remove(id);
                }, item.timeout || 3000);
            });
    }


    dark(message: string, title?: string) {
        return this.show({
            message, title, type: NotifyType.Dark
        });
    }
    primary(message: string, title?: string) {
        return this.show({
            message, title, type: NotifyType.Primary
        });
    }

    info(message: string, title?: string) {
        return this.show({
            message, title, type: NotifyType.Info
        });
    }
    success(message: string, title?: string) {
        return this.show({
            message, title, type: NotifyType.Success
        });
    }

    warning(message: string, title?: string) {
        return this.show({
            message, title, type: NotifyType.Warning
        });
    }

    danger(message: string, title?: string) {
        return this.show({
            message, title, type: NotifyType.Danger
        });
    }

}