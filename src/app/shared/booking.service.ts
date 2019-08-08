import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  SelectedBooking: Booking={
    _id: '',
    fname: [],
    fdesc: [],
    cname: '',
    cemail: '',
    cphone: '',
    caddress: '',
    quantity: [],
    price: 0,
    date: null
  };
  baseUrl = 'http://localhost:3200/';
  bookings: Booking[];

  constructor(private http: HttpClient) { }

  getBookings() {
    return this.http.get(this.baseUrl + "orders");
  }

  postBookings(newBooking: Booking) {
    return this.http.post(this.baseUrl + "orders", newBooking);
  }

}
