import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';

const routes: Routes = [
{
  path: 'home', component: HomeComponent
},
{
  path: 'about', component: AboutComponent
},
{
  path: 'contact', component: ContactComponent
},
{
  path: 'login', component: LoginComponent
},
{
  path: 'singup', component: SignupComponent
},
{
  path: '', redirectTo: '/home', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
