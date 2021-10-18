import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  matcher = new ErrorStateMatcher();
  subscription: Subscription[] = [];
  errorMessage: any;

  constructor(private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.pattern("[0-9 ]{10}")]],
      password: ['', [Validators.required, Validators.min(6)]]
    }, { validator: [this.checkPasswordsLength] });
  }

  
  checkPasswordsLength(group: FormGroup) {
    if (group == null) {
      return;
    }

    let pass = group.get('password')?.value as string;

    if (pass.length < 6) {
      return { passLength: true };
    }

    return { passLength: false };
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.forEach(element => {
      element.unsubscribe();
    })
  }

  register() {
    
    if(this.form.status === 'INVALID'){
      return;
    }

    const val = this.form.value;
    var user = { Email: '', FirstName: '', Password: '', PhoneNumber: '' }

    user.Email = val.email;
    user.FirstName = val.name;
    user.Password = val.password;
    user.PhoneNumber = val.phone;

    if (val.email && val.password) {
      var registerService = this.registerService.register(user)
        .subscribe(
          data => {
            console.log(data);
            //this.router.navigateByUrl('/home');
            
          },
          error => {
            this.errorMessage = error;
          },
          () => {

          }
        );
      this.subscription.push(registerService)
    }
  }


}
