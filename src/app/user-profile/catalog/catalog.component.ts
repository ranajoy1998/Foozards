import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/order.service';
import { Food } from '../../shared/food.model';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Category } from 'src/app/shared/category.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public apiurl = 'https://foozards-server.herokuapp.com';
  trustedUrl;
  flag: boolean = false;

  constructor(public userService: UserService, private router : Router, public foodService: OrderService, private sanitizer: DomSanitizer) {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.apiurl);
  }

  ngOnInit() {
    if(this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/userprofile/catalog');
      this.flag = true;
    }
    //console.log(this.flag);
    this.getfoods();
    this.getcatname();
  }

  getNumber(fd_id: string) {
    if(localStorage.map)
      this.foodService.map = new Map(JSON.parse(localStorage.map));
    if(this.foodService.map.has(fd_id)) {
      //console.log("value: " + this.foodService.map.get(fd_id));
      return this.foodService.map.get(fd_id);
    }
    else
      return 0;
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

  gotobook() {
    if(!this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
    else {
      this.router.navigateByUrl('/userprofile/booking');
    }
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

  postfoods(form: NgForm) {
    if(form.value._id === '') {
      this.foodService.postFoods(form.value).subscribe(
        res=>{
          this.getfoods();
        },
        err=>{

        }
      );
    }
    else {
      this.foodService.updateFood(form.value).subscribe(
        res=>{
          this.getfoods();
        }
      );
    }
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
  
  update(fd: Food) {
    this.foodService.SelectedFood = fd;
  }

  delete(fd: Food["_id"]) {
    this.foodService.deleteFood(fd).subscribe(
      res=>{
        this.foodService.deleteFood(fd);
        this.getfoods();
      }
    );
  }

}
