import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { AuthGuard } from './guards/auth.guard';
import { ExternalDevicesPageComponent } from './pages/external-devices-page/external-devices-page.component';
import { GithubSuccessPageComponent } from './pages/github-success-page/github-success-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
    {
        path: 'githubSuccess',
        component: GithubSuccessPageComponent,
        canActivate: [AuthGuard],
        data: { rejectAuthenticated: true },
    },
    {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [AuthGuard],
        data: { rejectAuthenticated: true },
    },
    {
        path: 'external',
        component: ExternalDevicesPageComponent,
        canActivate: [AuthGuard],
    },
    { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
