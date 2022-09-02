import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
    constructor(private router: Router) {}

    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: '/home',
            },
            {
                label: 'External Devices',
                icon: 'pi pi-qrcode',
                routerLink: '/external',
            },
        ];
    }

    onLogout(): void {
        localStorage.clear();
        this.router.navigate(['login']);
    }
}
