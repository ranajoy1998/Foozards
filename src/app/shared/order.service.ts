import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from './food.model';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  counter: number = 0;
  map = new Map<string, number>();

  SelectedFood: Food={
    _id:'',
    fname:'',
    fprice:null,
    category_id:'',
    fdesc:'',
    fpic:''
  };
  foods: Food[];
  cats: Category[];
  baseUrl = "http://localhost:3200/";

  initMap(fd_id: string, n: number) {
    if(n > 0)
      this.map.set(fd_id, n);
    else
      this.map.delete(fd_id);
    console.log(this.map);
  }

  getCategories() {
    return this.http.get(this.baseUrl + "categories");
  }

  getFoods() {
    return this.http.get(this.baseUrl + "foods");
  }

  postFoods(newFood: Food) {
    return this.http.post(this.baseUrl + "foods", newFood);
  }

  updateFood(fd: Food) {
    return this.http.put(this.baseUrl + "foods/" + fd._id, fd);
  }

  deleteFood(fd_id: Food["_id"]) {
    return this.http.delete(this.baseUrl + "foods/" + fd_id);
  }

  incCounter() {
    this.counter += 1;
  }

  resetCounter() {
    this.counter = 0;
  }

  constructor(private http: HttpClient) { 

  }
}
