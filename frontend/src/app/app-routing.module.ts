import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/login/login.component').then(
                (m) => m.LoginComponent,
            ),
    },
    {
        path: 'signup-success',
        loadComponent: () =>
            import('./pages/signup-success/signup-success.component').then(
                (m) => m.SignupSuccessComponent,
            ),
    },
    {
        path: 'verify',
        loadComponent: () =>
            import('./pages/verify-email/verify-email.component').then(
                (m) => m.VerifyEmailComponent,
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
