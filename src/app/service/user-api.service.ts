import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) {}
  pageData:Subject<number> = new Subject<number>()

  getData() {
    return this.http.get('http://localhost:3000/userData');
  }
  postData(data: any) {

    return this.http.post('http://localhost:3000/userData', data);
  }
  deleteData(empid: Number) {
    return this.http.delete('http://localhost:3000/userData/' + empid);
  }
  fetchData(getData:number){
    return this.http.get('http://localhost:3000/userData/' + getData)
  }
  updateData(data:any,id:number){
    console.log(data,id)
    return this.http.put('http://localhost:3000/userData/' + id,data)
  }
  //observer data from paginantion component

  page(page:number):void{
   this.pageData.next(page)
  }
}
