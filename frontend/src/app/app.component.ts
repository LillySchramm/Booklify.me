import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'frontend';
    hideHeader = false;

    constructor(private router: Router) {
        this.router.events.subscribe((data: any) => {
            if (data instanceof RoutesRecognized) {
                this.hideHeader = data.state.root.firstChild!.data['hideMenu'];
            }
        });
    }
}
