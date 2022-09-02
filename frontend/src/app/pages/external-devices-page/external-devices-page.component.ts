import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/api';
import { SessionService } from 'src/app/api/api/session.service';
import { MinimalSession } from 'src/app/api/model/minimalSession';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-external-devices-page',
    templateUrl: './external-devices-page.component.html',
    styleUrls: ['./external-devices-page.component.scss'],
})
export class ExternalDevicesPageComponent implements OnInit {
    sessions: MinimalSession[] = [];

    displayDialog: boolean = false;

    qrData: string = '';

    constructor(private sessionService: SessionService) {}

    ngOnInit(): void {
        this.loadSessions();
    }

    createSession(name: string): void {
        this.sessionService
            .persistentSession(name)
            .pipe(take(1))
            .subscribe((session) => {
                this.loadSessions();
                this.qrData = `${environment.API_BASE_PATH}\$${session.bearer}`;
                this.showDialog();
            });
    }

    loadSessions(): void {
        this.sessionService
            .getAllPersistentSessions()
            .pipe(take(1))
            .subscribe((sessions) => (this.sessions = sessions));
    }

    deleteSession(id: string): void {
        this.sessionService
            .invalidateSessionWithId(id)
            .pipe(take(1))
            .subscribe(() => this.loadSessions());
    }

    showDialog() {
        this.displayDialog = true;
    }
}
