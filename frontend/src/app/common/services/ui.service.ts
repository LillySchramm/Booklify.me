import { Injectable } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UiService {
    smallScreen = false;
    resize$ = fromEvent(window, 'resize').pipe(debounceTime(250));

    constructor() {
        this.smallScreen = window.innerWidth < 800;
        this.resize$.subscribe(() => {
            this.smallScreen = window.innerWidth < 800;
        });
    }
}
