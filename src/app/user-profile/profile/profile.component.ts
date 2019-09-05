import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/shared/booking.service';
import { Booking } from 'src/app/shared/booking.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  custemail = localStorage.getItem("cemail");

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
  }

  getCname() {
    return localStorage.getItem("cname");
  }

  getCphone() {
    return localStorage.getItem("cphone");
  }

  getCemail() {
    return localStorage.getItem("cemail");
  }

  getCaddress() {
    return localStorage.getItem("caddress");
  }

  getCorderno() {
    this.bookingService.getBookings(this.custemail).subscribe(
      res=>{
        this.bookingService.bookings = res as Booking[];
      },
      err=>{
        console.log(err);
      }
    );
    return this.bookingService.bookings.length;
  }
}
