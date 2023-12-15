import { Component, DoCheck, OnInit} from '@angular/core';
import { UserApiService } from 'src/app/service/user-api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, DoCheck{
  searchData: string = '';
  binding: string = '';
  user: Array<any> = [];
  bool: boolean = false;
  deleteId: any;
  page:number = 1;

  constructor(private api: UserApiService) {}

  ngOnInit() {
    this.getUser();
  }
  ngDoCheck(){
    let ob = this.api.pageData.subscribe((res)=>{
      this.page = res;
      console.log(res, 'h');
      
      ob.unsubscribe()
    })
  }
  
  getUser() {
    this.api.getData().subscribe((response: any) => {
      this.user = response;
      
    });
  }

  popup(data: string, id: Number) {
    if (data == 'cancel') {
      this.bool = false;
    }
    else if (data === 'ok') {
      this.api.deleteData(id).subscribe(() => {
        this.getUser();
      });
      this.bool = false;

    }
  }

  delete(data: any) {
    this.deleteId = data;
    this.bool = true;
    console.log(this.deleteId, this.bool);

  }

  OnPageChange(event:any){
    console.log(event)
  }
}
