import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';
import { Router } from '@angular/router';
import { OrderService } from './shared/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Foozards';
  userDetails: any;
  constructor(private userService: UserService, private router: Router, private foodService: OrderService) { }

  ngOnInit() {
    if(this.userService.isLoggedIn()) {
      this.userService.getUserProfile().subscribe(
        res => {
          this.userDetails = res['user'];
          localStorage.setItem('cname', this.userDetails.cname);
          localStorage.setItem('cemail', this.userDetails.cemail);
          localStorage.setItem('caddress', this.userDetails.caddress);
          localStorage.setItem('cphone', this.userDetails.cphone);
          console.log(this.userDetails);
        },
        err => { 
          console.log(err);
        }
      );
    }
    if(localStorage.map)
      this.foodService.map = new Map(JSON.parse(localStorage.map));
    if(localStorage.getItem('counter'))
      this.foodService.counter = parseInt(localStorage.getItem('counter'));
  }

  getCounter() {
    return parseInt(localStorage.getItem('counter'));
  }

  onLogout(){
    this.userDetails = undefined;
    this.userService.deleteToken();
    this.router.navigate(['/login']);
    localStorage.clear();
    localStorage.setItem('counter', '0');
    this.foodService.counter = 0;
    this.foodService.map.clear();
    localStorage.removeItem('cname');
    localStorage.removeItem('cemail');
    localStorage.removeItem('caddress');
    localStorage.removeItem('cphone');
  }
}
