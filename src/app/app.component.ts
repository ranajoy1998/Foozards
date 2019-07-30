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
          console.log(this.userDetails);
        },
        err => { 
          console.log(err);
        }
      );
    }
  }

  onLogout(){
    this.userDetails = undefined;
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
