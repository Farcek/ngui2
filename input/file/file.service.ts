import { InjectionToken } from '@angular/core';
export let IFileServiceToken = new InjectionToken('ngui.fileservice.interface');

export interface IProcessAction {
    (procent: number): void
}

export interface IFinishAction {
    (err: any, value: string): void
}

export interface IFileService {
    upload(file: any, processAction: IProcessAction, finishAction: IFinishAction)
}