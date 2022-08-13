import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'frontend';

    public openGithubAuth(): void {
        window.open(
            'https://github.com/login/oauth/authorize?scope=user:email&client_id=' +
                environment.oAuthClientId,
            '_self'
        );
    }
}
