import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bmap = new Map<string, number>();
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
  baseUrl = 'https://foozards-server.herokuapp.com/';
  public bookings: Booking[];

  constructor(private http: HttpClient) { }

  getBookings(cemail: string) {
    console.log(this.baseUrl + "orders/mail/" + cemail);
    return this.http.get(this.baseUrl + "orders/mail/" + cemail);
  }

  postBookings(newBooking: Booking) {
    return this.http.post(this.baseUrl + "orders", newBooking);
  }

}
