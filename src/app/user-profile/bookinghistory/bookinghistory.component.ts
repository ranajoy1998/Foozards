import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderService } from 'src/app/shared/order.service';
import { BookingService } from 'src/app/shared/booking.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Category } from 'src/app/shared/category.model';
import { Food } from 'src/app/shared/food.model';
import { Booking } from 'src/app/shared/booking.model';

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.css']
})
export class BookinghistoryComponent implements OnInit {
  public apiurl = 'https://foozards-server.herokuapp.com';
  trustedUrl;
  userdetails: any;

  constructor(private userService: UserService, private router: Router, private bookingService: BookingService, private foodService: OrderService, private sanitizer: DomSanitizer) {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.apiurl);
  }

  ngOnInit() {
    if(!this.userService.isLoggedIn())
      this.router.navigateByUrl('/user/login');
    this.getfoods();
    this.getcatname();
    console.log(localStorage.getItem('cemail'));
    this.getbookings(localStorage.getItem('cemail'));
  }

  hasMap() {
    //console.log(this.bookingService.bookings);
    if(this.bookingService.bookings.length === 0) {
      return false;
    }
    else
      return true;
  }

  gotocatalog() {
    this.router.navigateByUrl('/userprofile/catalog');
  }

  getSafeUrl(fpic) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.apiurl + '/' + fpic);
  }

  getbookings(cemail: string) {
    this.bookingService.getBookings(cemail).subscribe(
      res=>{
        this.bookingService.bookings = res as Booking[];
      },
      err=>{
        console.log(err);
      }
    );
  }
  
  getfoods() {
    this.foodService.getFoods().subscribe(
      res=>{
        this.foodService.foods = res as Food[];
      },
      err=>{

      }
    );
  }

  getcatname() {
    this.foodService.getCategories().subscribe(
      res=>{
        this.foodService.cats = res as Category[];
        //console.log(this.foodService.cats);
      },
      err=>{
        
      }
    );
  }
}
