import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { server } from 'src/app/server';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(user: any):Observable<any>{
    return this.http.post<any>(`${server.serverUrl}/api/members/register`, user).pipe(map(result => {
      return result;
    })
    )
  }
}
