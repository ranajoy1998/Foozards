import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/order.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Food } from 'src/app/shared/food.model';
import { Category } from 'src/app/shared/category.model';
import { DatePipe } from '@angular/common';
import { BookingService } from 'src/app/shared/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public apiurl = 'http://localhost:3200';
  trustedUrl;
  myDate = new Date();
  public mydate;
  showSuccessMessage: boolean;
  userDetails: any;

  constructor(private userService: UserService, private router: Router, private bookingService: BookingService, private foodService: OrderService, private sanitizer: DomSanitizer, private datepipe: DatePipe) {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.apiurl);
    this.mydate = this.datepipe.transform(this.myDate, 'yyyy-MM-ddTHH:mm:ss.SSS');
  }

  ngOnInit() {
    if(!this.userService.isLoggedIn())
      this.router.navigateByUrl('/user/login');
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        //console.log(this.userDetails);
      },
      err => { 
        console.log(err);
      }
    );
    this.getfoods();
    this.getcatname();
  }

  addCounter(fd_id: string, count: number) {
    this.foodService.counter++;
    localStorage.setItem('counter', this.foodService.counter.toString());
    this.foodService.initMap(fd_id, ++count);
  }

  subCounter(fd_id: string, cntr: number) {
    if(cntr > 0)
      this.foodService.counter--;
    localStorage.setItem('counter', this.foodService.counter.toString());
    this.foodService.initMap(fd_id, --cntr);
  }

  removeItem(fd_id: string) {
    this.foodService.counter -= this.foodService.map.get(fd_id);
    localStorage.setItem('counter', this.foodService.counter.toString());
    this.foodService.map.delete(fd_id);
  }

  hasMap() {
    if(this.foodService.map.size == 0) {
      return false;
    }
    else
      return true;
  }

  getQuantity(key: string) {
    return this.foodService.map.get(key);
  }

  getPrice(fd: Food, value: number) {
    return (fd.fprice * value);
  }

  gotocatalog() {
    this.router.navigateByUrl('/userprofile/catalog');
  }

  gotobook(map: Map<string, number>) {
    console.log(this.mydate);
    this.bookingService.SelectedBooking.date = this.mydate;
    this.bookingService.SelectedBooking.cname = this.userDetails.cname;
    this.bookingService.SelectedBooking.cphone = this.userDetails.cphone;
    this.bookingService.SelectedBooking.caddress = this.userDetails.caddress;
    this.bookingService.SelectedBooking.cemail = this.userDetails.cemail;
    for(const [key, value] of map.entries()) {
      const fd = this.foodService.foods.find(food => food._id === key);
      this.bookingService.SelectedBooking.fname.push(fd.fname);
      this.bookingService.SelectedBooking.fdesc.push(fd.fdesc);
      this.bookingService.SelectedBooking.quantity.push(value);
      this.bookingService.SelectedBooking.price += (fd.fprice * value);
    }
    this.bookingService.postBookings(this.bookingService.SelectedBooking).subscribe(
      data => {
        console.log('Success', data);
        this.showSuccessMessage = true;
        localStorage.removeItem('counter');
        this.foodService.map.clear();
      },
      error => console.error('Error', error)
    );
    //this.router.navigateByUrl('userprofile/bookinghistory');
  }

  getSafeUrl(fpic) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.apiurl + '/' + fpic);
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
