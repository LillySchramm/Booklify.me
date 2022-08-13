import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GithubSuccessPageComponent } from './pages/github-success-page/github-success-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
    { path: 'githubSuccess', component: GithubSuccessPageComponent },
    { path: 'login', component: LoginPageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
