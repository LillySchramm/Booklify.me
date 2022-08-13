import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [LoginPageComponent],
    imports: [CommonModule, ButtonModule],
    exports: [LoginPageComponent],
})
export class LoginPageModule {}
