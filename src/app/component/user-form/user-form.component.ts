import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserApiService } from 'src/app/service/user-api.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  dataId: any;
  toUpdate: undefined | any;
  user: FormGroup;
  submitted = false;
  userData: {
    name: String,
    email: String,
    role: String,
  }[] = [];
  constructor(private formBuilder: FormBuilder, private api: UserApiService, private route: Router, private activatedRoute: ActivatedRoute) {
    this.user = this.formBuilder.group(
      {

        name: [
          '',
          [
            Validators.required,
          ],
        ],
        role: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
      },

    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.user.controls
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: Params) => {
      let id = param['get']('id');
      this.dataId = id;
      console.log(this.dataId)
    });
    if (this.dataId) {
      this.api.fetchData(this.dataId).subscribe((data: any) => {
        this.toUpdate = data;
        this.user.patchValue({
          name: this.toUpdate.name,
          email: this.toUpdate.email,
          role: this.toUpdate.role,
        });
      });
    }
  }
  getUser() {
    this.api.getData().subscribe((response: any) => {
      this.userData = response;
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.user.invalid) {
      return;
    }
    if (this.dataId) {
      // console.log(this.toUpdate,this.toUpdate.id)
      this.api.updateData(this.user.value,this.toUpdate.id)
        .subscribe(() => {
          this.route.navigate(['/']);
        });
    } else {
      this.api.postData(this.user.value).subscribe(() => {});
      this.getUser();
      this.route.navigate(['/']);
    }
  }
  

}
