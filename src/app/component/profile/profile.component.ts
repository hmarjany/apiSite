import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../login/service/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  subscription :Subscription[]= [];
  form = new FormGroup({});
  model: any = { Email: '',FirstName:'',PhoneNumber:'' };

  fields: FormlyFieldConfig[] = [{
    type: 'tabs',
    fieldGroup: [
      {
        templateOptions: { label: 'مشخصات فردی' },
        fieldGroup: [
          {
            key: 'Email',
            type: 'input',
            templateOptions: {
              label: 'نام کاربری',
              required: true,
              readonly: true
            }
          },
          {
            key: 'FirstName',
            type: 'input',
            templateOptions: {
              label: 'نام و نام خانوادگی',
              required: true,
            }
          },
          {
            key: 'PhoneNumber',
            type: 'input',
            templateOptions: {
              label: 'شماره تلفن',
              required: true,
            }
          },
          {
            key: 'save',
            type: 'buttun',
            templateOptions: {
              label: 'ذخیره تغییرات',
              click: () => { this.savePersonalData() }
            }
          }
        ],
      },
      {
        templateOptions: { label: 'وب سرویس ها' },
        fieldGroup: [

        ],
      },
      {
        templateOptions: { label: 'تغییر رمز عبور' },
        fieldGroup: [
          {
            key: 'OldPassword',
            type: 'input',
            templateOptions: {
              label: 'رمز عبور قبلی',
              type: 'password',
            }
          },
          {
            key: 'NewPassword',
            type: 'input',
            templateOptions: {
              label: 'رمز عبور جدید',
              type: 'password',
              minLength: 6
            }
          },
          {
            key: 'save',
            type: 'buttun',
            templateOptions: {
              label: 'تغییر رمز عبور',
              click: () => { this.changePassword() }
            }
          }
        ],
      },


    ],
  }];

  constructor(private authenticationService: AuthenticationService) {
    var currentUser = authenticationService.currentUserValue;
    this.model.Email = currentUser.user.Email;
    this.model.FirstName = currentUser.user.FirstName;
    this.model.PhoneNumber = currentUser.user.PhoneNumber;
   }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription.forEach(element=> {
      element.unsubscribe();
    })
  }

  savePersonalData() {
    if(!this.model.FirstName && !this.model.PhoneNumber){
      return;
    }
    var service = this.authenticationService.updateUser(this.model).subscribe();
    this.subscription.push(service);
  }

  changePassword(){
    if(!this.model.OldPassword && !this.model.NewPassword){
      return;
    }
    var fieldGroup = this.fields[0].fieldGroup?.filter(x=> x.templateOptions?.label === 'تغییر رمز عبور')[0];
    if(fieldGroup?.formControl?.status === 'INVALID'){
      return;
    }
    var service = this.authenticationService.changePassword(this.model).subscribe();
    this.subscription.push(service);
  }
}
