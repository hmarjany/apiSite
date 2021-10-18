import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../login/service/authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  form: FormGroup;
  returnUrl: string = '';
  subscription: Subscription[] = [];
  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) {

    this.form = this.fb.group({
      username: ['', [Validators.email, Validators.required]]
    });

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'];
    });
  }

  ngOnDestroy() {
    this.subscription.forEach(element => {
      element.unsubscribe();
    })
  }

  reset() {
    
    if(this.form.status === 'INVALID'){
      return;
    }

    const val = this.form.value;

    const email = {email:val.username};
    if (val.username) {
      this.authService.forgetPassword(email)
        .subscribe(
          data => {
            if (this.returnUrl != undefined) {
              this.router.navigateByUrl('/home');
            } else {
              this.router.navigateByUrl('/home');
            }
          },
          error => {
          },
          () => {

          }
        );
    }
  }

}