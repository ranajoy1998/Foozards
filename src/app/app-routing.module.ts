import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './user-profile/home/home.component';
import { CatalogComponent } from './user-profile/catalog/catalog.component';
import { BookingComponent } from './user-profile/booking/booking.component';
import { AboutComponent } from './user-profile/about/about.component';
import { BookinghistoryComponent } from './user-profile/bookinghistory/bookinghistory.component';
import { ContactComponent } from './user-profile/contact/contact.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'catalog', component: CatalogComponent },
    {
        path: 'userprofile', component: UserProfileComponent,
        children: [{path: 'catalog', component: CatalogComponent}]
    },
    {
        path: 'userprofile', component: UserProfileComponent,
        children: [{path: 'booking' , component: BookingComponent}]
    },
    {
        path: 'userprofile', component: UserProfileComponent,
        children: [{path: 'about' , component: AboutComponent}]
    },
    {
        path: 'userprofile', component: UserProfileComponent,
        children: [{path: 'bookinghistory', component: BookinghistoryComponent}]
    },
    {
        path: 'userprofile', component: UserProfileComponent,
        children: [{path: 'home', component: HomeComponent}]
    },
    { path: 'userprofile', pathMatch: 'full', redirectTo: '/userprofile/home' },
    { path: 'userprofile/', pathMatch: 'full', redirectTo: '/userprofile/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
