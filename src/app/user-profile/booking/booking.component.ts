import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/order.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Food } from 'src/app/shared/food.model';
import { Category } from 'src/app/shared/category.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public apiurl = 'http://localhost:3200';
  trustedUrl;

  constructor(private userService: UserService, private router: Router, private foodService: OrderService, private sanitizer: DomSanitizer) {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.apiurl);
  }

  ngOnInit() {
    if(!this.userService.isLoggedIn())
      this.router.navigateByUrl('/user/login');
    this.getfoods();
    this.getcatname();
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
