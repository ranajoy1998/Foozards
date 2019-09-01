import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './user-profile/home/home.component';
import { AboutComponent } from './user-profile/about/about.component';
import { ContactComponent } from './user-profile/contact/contact.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { CatalogComponent } from './user-profile/catalog/catalog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user/user.component';
import { BookingComponent } from './user-profile/booking/booking.component';
import { BookinghistoryComponent } from './user-profile/bookinghistory/bookinghistory.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './shared/user.service';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';
import { ProfileComponent } from './user-profile/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    CatalogComponent,
    UserProfileComponent,
    UserComponent,
    BookingComponent,
    BookinghistoryComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, DatePipe, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
