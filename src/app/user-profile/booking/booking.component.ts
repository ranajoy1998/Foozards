import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn())
      this.router.navigateByUrl('/user/login');
  }

}
