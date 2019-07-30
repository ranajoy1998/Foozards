import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public id = '';
  constructor(private userService: UserService, private router : Router, private route: ActivatedRoute) { }

  model = {
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() {
    if(this.userService.isLoggedIn())
      this.router.navigateByUrl('/userprofile');
    this.id = this.route.snapshot.paramMap.get('id');
  }

  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        
        if (this.id == null) {
          this.router.navigateByUrl('userprofile/home');
        }
        else {
          this.router.navigate([ '/userprofile/booking', {id: this.id} ]);
        }
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }
}
