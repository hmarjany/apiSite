import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { server } from 'src/app/server';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUserApiSite') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${server.serverUrl}api/members/login`, user).pipe(mergeMap(result => {
      let body = new URLSearchParams();
      body.set('username', user.Username);
      body.set('password', user.Password);
      body.set('grant_type', 'password');
      return this.http.post<any>(`${server.serverUrl}/token`, body).pipe(map(token => {
        const authUser = { user: '', token: '' };
        authUser.user = result;
        authUser.token = token.access_token;
        localStorage.setItem('currentUserApiSite', JSON.stringify(authUser));
        this.currentUserSubject.next(authUser);
        return authUser;
      })
      )
    })
    )
  }

  updateUser(user: any) {
    return this.http.post<any>(`${server.serverUrl}api/members/updateUser`, user).pipe(map(result => {
      var currentUser = this.currentUserValue;
      localStorage.removeItem('currentUserApiSite');
      this.currentUserSubject.next(null);
      this.currentUser = this.currentUserSubject.asObservable();
      currentUser.user.FirstName = result.FirstName;
      currentUser.user.PhoneNumber = result.PhoneNumber;
      localStorage.setItem('currentUserApiSite', JSON.stringify(currentUser));
      this.currentUserSubject.next(currentUser);
    }));
  }

  forgetPassword(email: any){
    return this.http.post<any>(`${server.serverUrl}api/members/forgetPassword`, email).pipe(map(result => {
      
    }));
  }

  changePassword(changePassword: any){
    return this.http.post<any>(`${server.serverUrl}api/members/changePassword`, changePassword).pipe(map(result => {
      
    }));
  }

  logout() {
    localStorage.removeItem('currentUserApiSite');
    this.currentUserSubject.next(null);
    this.currentUser = this.currentUserSubject.asObservable();

  }
}
