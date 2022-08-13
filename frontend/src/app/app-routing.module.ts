import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
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
    { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
