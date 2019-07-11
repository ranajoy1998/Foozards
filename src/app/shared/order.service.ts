import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Food } from './food.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  SelectedFood: Food={
    _id:'',
    fname:'',
    fprice:null,
    category_id:'',
    fdesc:'',
    fpic:''
  };
  foods: Food[];
  baseUrl = "http://localhost:3000/";

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

  constructor(private http: HttpClient) { 

  }
}
