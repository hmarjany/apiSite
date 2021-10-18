import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorObject: any;
  subscription :Subscription[]= [];
  errorMessage: any;
  returnUrl: string = '';

  constructor(private fb: FormBuilder, 
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) {

    this.form = this.fb.group({
      Username: ['', [Validators.email, Validators.required]],
      Password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
  });
  }

  ngOnDestroy(){
    this.subscription.forEach(element=> {
      element.unsubscribe();
    })
  }
  
  logout(){
    this.authenticationService.logout();
  }
  
  login() {

    if(this.form.status === 'INVALID'){
      return;
    }
    const val = this.form.value;

    const user = {Username:'',Password:''};
    user.Username = val.Username;
    user.Password = val.Password;

    if (val.Username && val.Password) {
      var loginService = this.authenticationService.login(user).subscribe(result=>{
        if(this.returnUrl != undefined){
          this.router.navigateByUrl(this.returnUrl);
        }else{
          this.router.navigateByUrl('/home');
        }
      },
      error=>{
        this.errorMessage = error;
      })
      this.subscription.push(loginService)
    }
  }
}
