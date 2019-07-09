import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Food } from '../shared/food.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(private foodService: OrderService) {

  }

  ngOnInit() {
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
