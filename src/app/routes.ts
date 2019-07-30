import { Routes } from '@angular/router';
import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from './user/login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './user/user.component';
import { CatalogComponent } from './user-profile/catalog/catalog.component';
import { HomeComponent } from './user-profile/home/home.component';
import { AboutComponent } from './user-profile/about/about.component';
import { BookingComponent } from './user-profile/booking/booking.component';
import { BookinghistoryComponent } from './user-profile/bookinghistory/bookinghistory.component';
import { ContactComponent } from './user-profile/contact/contact.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignupComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [
            { path: '', component: LoginComponent }
        ]
    },
    {
        path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard],
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', pathMatch: 'full', redirectTo: '/home' }
];
