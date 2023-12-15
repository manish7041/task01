import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './component/user-form/user-form.component';
import { UserListComponent } from './component/user-list/user-list.component';

const routes: Routes = [
  {path:'',redirectTo:'userList',pathMatch:'full'},
  {path:'userForm',component:UserFormComponent},
  {path:'userList',component:UserListComponent},
  {path:'userList/:id',component:UserFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
